"use client"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useChat } from "ai/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Send, FileText, Trash2, PaperclipIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { AssistantMessage } from "@/components/shared/assistant/assistant-message"
import { FileUploader } from "@/components/shared/assistant/file-uploader"
import { SavedFilesList } from "@/components/shared/assistant/saved-files-list"
import { useRouter } from "next/navigation"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
}

export default function AssistantPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isCreatingAssistant, setIsCreatingAssistant] = useState(false)

  // Get or create a chat ID for this session
  const [chatId, setChatId] = useState<string | null>(null)

  useEffect(() => {
    // Try to get chat ID from localStorage
    const storedChatId = localStorage.getItem("assistantChatId")
    if (storedChatId) {
      setChatId(storedChatId)
    } else {
      // Generate a new chat ID if none exists
      const newChatId = `chat-${Date.now()}`
      localStorage.setItem("assistantChatId", newChatId)
      setChatId(newChatId)
    }
  }, [])

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/assistant",
    body: {
      assistantId: process.env.NEXT_PUBLIC_ASSISTANT_ID,
    },
    query: {
      chatId: chatId,
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    },
  })

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Create assistant if user doesn't have one
  const createAssistant = async () => {
    if (!session?.user?.id) return

    setIsCreatingAssistant(true)
    try {
      const response = await fetch("/api/assistant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          name: `${session.user.name}'s EduTeach Assistant`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create assistant")
      }

      const data = await response.json()
      toast.success("Your personal assistant has been created!")

      // Refresh the session to get the updated assistantId
      router.refresh()
    } catch (error) {
      toast.error(`Error creating assistant: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsCreatingAssistant(false)
    }
  }

  // Handle file upload
  const handleFileUpload = async (files: File[], fileIds: string[]) => {
    // Add the uploaded files to the state
    const newUploadedFiles = files.map((file, index) => ({
      id: fileIds[index],
      name: file.name,
      size: file.size,
      type: file.type,
    }))

    setUploadedFiles((prev) => [...prev, ...newUploadedFiles])
  }

  // Remove file from attachments
  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
    toast.success("File removed")
  }

  if (status === "loading") {
    return (
      <div className="container py-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_ID

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Your Teaching Assistant</h1>

      {!assistantId ? (
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Welcome to Your Personal Teaching Assistant</h2>
          <p className="mb-6">
            Create your personal AI assistant to help with lesson planning, grading, and answering educational
            questions.
          </p>
          <Button onClick={createAssistant} disabled={isCreatingAssistant}>
            {isCreatingAssistant && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create My Assistant
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
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

                  {uploadedFiles.length > 0 && (
                    <div className="px-4 py-2 border-t bg-muted/50">
                      <p className="text-sm font-medium mb-2">Attached Files:</p>
                      <div className="flex flex-wrap gap-2">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center gap-2 bg-background rounded-md px-3 py-1 text-sm"
                          >
                            <PaperclipIcon className="h-3 w-3" />
                            <span className="truncate max-w-[150px]">{file.name}</span>
                            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeFile(file.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 border-t">
                    <form onSubmit={handleSubmit} className="flex items-end gap-2">
                      <Textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask anything about teaching, lesson planning, or educational content..."
                        className="min-h-[80px] flex-1"
                      />
                      <div className="flex flex-col gap-2">
                        <FileUploader onUpload={handleFileUpload} threadId={chatId || undefined} disabled={isLoading} />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="files" className="flex-1 p-4 m-0">
                  <SavedFilesList
                    userId={session?.user?.id || ""}
                    onUseFile={(file) => {
                      // Upload the file to OpenAI
                      const formData = new FormData()
                      formData.append("file", file)
                      if (chatId) {
                        formData.append("threadId", chatId)
                      }

                      fetch("/api/assistant/upload", {
                        method: "POST",
                        body: formData,
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("Failed to upload file")
                          }
                          return response.json()
                        })
                        .then((data) => {
                          setUploadedFiles((prev) => [
                            ...prev,
                            {
                              id: data.id,
                              name: file.name,
                              size: file.size,
                              type: file.type,
                            },
                          ])
                          setActiveTab("chat")
                          toast.success("File uploaded and attached to the conversation")
                        })
                        .catch((error) => {
                          toast.error(`Error uploading file: ${error.message}`)
                        })
                    }}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Assistant Help</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Lesson Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Ask for lesson plan ideas, activities, or curriculum alignment.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-1">Content Creation</h3>
                  <p className="text-sm text-muted-foreground">
                    Request worksheets, quizzes, or educational materials.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-1">Subject Knowledge</h3>
                  <p className="text-sm text-muted-foreground">
                    Get explanations on topics to help prepare your lessons.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-1">File Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload student work or curriculum documents for analysis.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
