import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema/tables"
import { eq } from "drizzle-orm"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, name } = await req.json()

    // Verify the user is creating their own assistant
    if (userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create an assistant with OpenAI
    const assistant = await openai.beta.assistants.create({
      name: name || `${session.user.name}'s EduTeach Assistant`,
      instructions: `You are a helpful teaching assistant for ${session.user.name}. Your purpose is to assist with educational tasks such as:

1. Lesson planning and curriculum development
2. Creating educational materials and assessments
3. Providing subject matter expertise across various disciplines
4. Analyzing student work and providing feedback
5. Suggesting teaching strategies and classroom activities

You should be professional, supportive, and focused on educational best practices. When asked about educational content, provide accurate information and cite sources when appropriate. You can analyze uploaded files like student work, curriculum documents, or educational resources.`,
      model: "gpt-4o",
      tools: [
        {
          type: "file_search", // Enable file upload and retrieval
        },
      ],
    })

    // Update the user record with the assistant ID
    await db.update(users).set({ assistantId: assistant.id }).where(eq(users.id, userId))

    return NextResponse.json({
      success: true,
      assistantId: assistant.id,
    })
  } catch (error) {
    console.error("Error creating assistant:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create assistant" },
      { status: 500 },
    )
  }
}
