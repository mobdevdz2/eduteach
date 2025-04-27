import { useRef, useState } from "react"
import { useAssistant } from "@ai-sdk/react"
import { ChevronLeft, ChevronRight, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AssistantMessage } from "@/components/custom/assistant/assistant-message"
import { FileUploader } from "@/components/custom/assistant/file-uploader"
import { SavedFilesList } from "@/components/custom/assistant/saved-files-list"
import { toast } from "sonner"
import { useUploadFile } from "@/services/chats-service"
import MessageForm from "@/components/custom/assistant/message-form"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
}

interface ChatThread {
  id: string
  name: string
  openaiThreadId: string
}

interface ChatContainerProps {
  session: any
  activeThreadId: string | null
  openaiThreadId: string | null
  isSidebarOpen: boolean
  onToggleSidebar: () => void
  onCreateNewChat: () => void
  threads: ChatThread[]
  uploadedFiles: UploadedFile[]
  updateUploadedFiles: (files: UploadedFile[]) => void
}

export default function ChatContainer({
  session,
  activeThreadId,
  openaiThreadId,
  isSidebarOpen,
  onToggleSidebar,
  onCreateNewChat,
  threads,
  uploadedFiles,
  updateUploadedFiles,
}: ChatContainerProps) {
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { mutateAsync: uploadFile } = useUploadFile()

  const { messages, input, handleInputChange, submitMessage, status: assistantStatus } = useAssistant({
    api: "/api/assistant",
    body: {
      assistantId: session?.user?.assistantId,
      threadId: openaiThreadId,
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    },
  })

  // Handle file upload
  const handleFileUpload = async (files: File[], fileIds: string[]) => {
    // Add the uploaded files to the state
    const newUploadedFiles = files.map((file, index) => ({
      id: fileIds[index],
      name: file.name,
      size: file.size,
      type: file.type,
    }))

    updateUploadedFiles([...uploadedFiles, ...newUploadedFiles])
  }

  // Handle file upload from saved files
  const handleUseSavedFile = async (file: File) => {
    try {
      const result = await uploadFile({
        file,
        threadId: openaiThreadId || undefined,
      })

      updateUploadedFiles([
        ...uploadedFiles,
        {
          id: result.id,
          name: file.name,
          size: file.size,
          type: file.type,
        },
      ])

      setActiveTab("chat")
      toast.success("File uploaded and attached to the conversation")
    } catch (error) {
      console.error("Error using saved file:", error)
    }
  }

  // Remove file from attachments
  const removeFile = (fileId: string) => {
    updateUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId))
    toast.success("File removed")
  }

  // Scroll to the end of messages when new messages are added
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-2">
          {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
        <h2 className="text-lg font-semibold flex-1 truncate">
          {activeThreadId ? threads?.find((t) => t.id === activeThreadId)?.name || "Chat" : "Chat"}
        </h2>
        <Button variant="ghost" size="sm" onClick={onCreateNewChat} className="ml-2">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-4 py-2 border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
            <ScrollArea className="flex-1 p-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                  <p className="text-muted-foreground max-w-md">
                    Your teaching assistant can help with lesson planning, creating assessments, answering subject
                    questions, and more.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <AssistantMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            <MessageForm
              input={input}
              handleInputChange={handleInputChange}
              submitMessage={submitMessage}
              assistantStatus={assistantStatus}
              uploadedFiles={uploadedFiles}
              handleFileUpload={handleFileUpload}
              removeFile={removeFile}
              openaiThreadId={openaiThreadId}
              onMessageSubmit={scrollToBottom}
            />
          </TabsContent>

          <TabsContent value="files" className="flex-1 p-4 m-0">
            <SavedFilesList userId={session?.user?.id || ""} onUseFile={handleUseSavedFile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}