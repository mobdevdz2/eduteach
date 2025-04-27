"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  useGetChatThreads,
  useCreateChatThread,
  useUpdateChatThread,
  useDeleteChatThread,
  useCreateAssistant,
} from "@/services/chats-service"
import ChatsNav from "@/components/custom/assistant/chats-nav"
import ChatContainer from "@/components/custom/assistant/chat-container"

// Create a client


// Form schema for new chat
const newChatFormSchema = z.object({
  name: z.string().min(1, "Chat name is required"),
})

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
}

export default function AssistantPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [openaiThreadId, setOpenaiThreadId] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  // Use React Query hooks
  const { data: threads = [], isPending: isLoadingThreads, mutate: refetchThreads } = useGetChatThreads()
  const { mutateAsync: createThread } = useCreateChatThread()
  const { mutateAsync: updateThread } = useUpdateChatThread()
  const { mutateAsync: deleteThread } = useDeleteChatThread()
  const { mutateAsync: createAssistant, isPending: isCreatingAssistant } = useCreateAssistant()

  // Form for new chat
  const newChatForm = useForm<z.infer<typeof newChatFormSchema>>({
    resolver: zodResolver(newChatFormSchema),
    defaultValues: {
      name: "",
    },
  })

  // Set active thread when threads are loaded
  useEffect(() => {
    if (threads?.length > 0 && !activeThreadId) {
      setActiveThreadId(threads[0].id)
      setOpenaiThreadId(threads[0].openaiThreadId)
    } else if (threads.length === 0 && !isLoadingThreads) {
      // If no threads, create a default one
      handleCreateNewThread("New Chat")
    }
  }, [threads, isLoadingThreads, activeThreadId])

  // Refetch threads on mount
  useEffect(() => {
    refetchThreads({ userId: session?.user?.id })
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const handleCreateNewThread = async (name: string) => {
    try {
      const newThread = await createThread({ name })
      await  refetchThreads({ userId: session?.user?.id }) // Refetch threads after creating a new one
      setActiveThreadId(newThread.id)
      setOpenaiThreadId(newThread.openaiThreadId)
      setUploadedFiles([])
      return newThread
    } catch (error) {
      console.error("Error creating thread:", error)
    }
  }

  const handleRenameThread = async (threadId: string, name: string) => {
    try {
      await updateThread({ id: threadId, data: { name } })
    } catch (error) {
      console.error("Error renaming thread:", error)
    }
  }

  const handleDeleteThread = async (threadId: string) => {
    try {
      await deleteThread(threadId)

      // If the active thread was deleted, set the first available thread as active
      if (activeThreadId === threadId) {
        const remainingThreads = threads.filter((thread) => thread.id !== threadId)
        if (remainingThreads.length > 0) {
          setActiveThreadId(remainingThreads[0].id)
          setOpenaiThreadId(remainingThreads[0].openaiThreadId)
        } else {
          // If no threads left, create a new one
          handleCreateNewThread("New Chat")
        }
      }
    } catch (error) {
      console.error("Error deleting thread:", error)
    }
  }

  const handleSelectThread = (threadId: string) => {
    const thread = threads.find((t) => t.id === threadId)
    if (thread) {
      setActiveThreadId(threadId)
      setOpenaiThreadId(thread.openaiThreadId)
      setUploadedFiles([])
    }
  }

  // Handle assistant creation
  const handleCreateAssistant = async () => {
    if (!session?.user?.id) return

    try {
      await createAssistant(session.user.id)
      // Refresh the session to get the updated assistantId
      router.refresh()
    } catch (error) {
      console.error("Error creating assistant:", error)
    }
  }

  // Handle new chat form submission
  const onNewChatSubmit = (data: z.infer<typeof newChatFormSchema>) => {
    handleCreateNewThread(data.name)
    newChatForm.reset()
    setIsNewChatDialogOpen(false)
  }

  const updateUploadedFiles = (files: UploadedFile[]) => {
    setUploadedFiles(files)
  }

  if (status === "loading" || isLoadingThreads) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const assistantId = session?.user?.assistantId

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Your Teaching Assistant</h1>

      {!session?.user?.id ? (
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Welcome to Your Personal Teaching Assistant</h2>
          <p className="mb-6">
            Create your personal AI assistant to help with lesson planning, grading, and answering educational
            questions.
          </p>
          <Button onClick={handleCreateAssistant} disabled={isCreatingAssistant}>
            {isCreatingAssistant && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create My Assistant
          </Button>
        </Card>
      ) : (
        <div className="flex h-[calc(100vh-200px)]">
          {/* Sidebar for chat threads */}
          <ChatsNav
            threads={threads}
            activeThreadId={activeThreadId}
            isSidebarOpen={isSidebarOpen}
            onCreateNewChat={() => setIsNewChatDialogOpen(true)}
            onSelectThread={handleSelectThread}
            onRenameThread={handleRenameThread}
            onDeleteThread={handleDeleteThread}
          />

          {/* Main chat area */}
          <ChatContainer
            session={session}
            activeThreadId={activeThreadId}
            openaiThreadId={openaiThreadId}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onCreateNewChat={() => setIsNewChatDialogOpen(true)}
            threads={threads}
            uploadedFiles={uploadedFiles}
            updateUploadedFiles={updateUploadedFiles}
          />
        </div>
      )}

      {/* New Chat Dialog */}
      <Dialog open={isNewChatDialogOpen} onOpenChange={setIsNewChatDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Chat</DialogTitle>
          </DialogHeader>
          <Form {...newChatForm}>
            <form onSubmit={newChatForm.handleSubmit(onNewChatSubmit)} className="grid gap-4 py-4">
              <FormField
                control={newChatForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chat Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Chat name"
                        {...field}
                        autoFocus 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsNewChatDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}