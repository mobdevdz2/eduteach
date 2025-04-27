import OpenAI from "openai";
import { type NextRequest } from "next/server";
import { AssistantResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Map to store client chatIds to OpenAI threadIds
// In production, this should be in a database
const chatThreadMap = new Map<string, string>();

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  // Parse the request body
  const { message, chatId } = await req.json();

  let threadId: string;
  const assistantId = "asst_4dIR7eVc5VzcDGUFQrKAPfSJ"
  // Check if we already have a thread for this chatId
  if (chatId && chatThreadMap.has(chatId)) {
    threadId = chatThreadMap.get(chatId)!;
  } else {
    // Create a new OpenAI thread
    const thread = await openai.beta.threads.create({});
    threadId = thread.id;
    
    // Store the mapping
    if (chatId) {
      chatThreadMap.set(chatId, threadId);
    }
  }

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
  console.log("Created message:", createdMessage);
  // If the assistantId is not provided, throw an error
  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          assistantId ??
          (() => {
            throw new Error("ASSISTANT_ID is not set");
          })(),
      });

      // Forward run status would stream message deltas
      let runResult = await forwardStream(runStream);

      // Handle tool calls if needed
      while (
        runResult?.status === "requires_action" &&
        runResult.required_action?.type === "submit_tool_outputs"
      ) {
        const tool_outputs = runResult.required_action.submit_tool_outputs.tool_calls.map(
          (toolCall: any) => {
            const parameters = JSON.parse(toolCall.function.arguments);

            switch (toolCall.function.name) {
              // Configure your tool calls here
              default:
                throw new Error(`Unknown tool call function: ${toolCall.function.name}`);
            }
          }
        );

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(threadId, runResult.id, {
            tool_outputs,
          })
        );
      }
    }
  );
}