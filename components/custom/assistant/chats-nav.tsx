import { useState, useEffect } from "react"
import { Plus, Search, MessageSquare, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Form schema
const searchFormSchema = z.object({
  query: z.string(),
})

interface ChatThread {
  id: string
  name: string
  openaiThreadId: string
}

interface ChatsNavProps {
  threads: ChatThread[]
  activeThreadId: string | null
  isSidebarOpen: boolean
  onCreateNewChat: () => void
  onSelectThread: (threadId: string) => void
  onRenameThread: (threadId: string, name: string) => void
  onDeleteThread: (threadId: string) => void
}

export default function ChatsNav({
  threads,
  activeThreadId,
  isSidebarOpen,
  onCreateNewChat,
  onSelectThread,
  onRenameThread,
  onDeleteThread,
}: ChatsNavProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Form setup
  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
    },
  })

  // Update search query when form value changes
  useEffect(() => {
    setSearchQuery(searchForm.watch("query"))
  }, [searchForm.watch("query")])

  // Filter threads based on search query
  const filteredThreads = threads?.filter((thread) => 
    thread.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isSidebarOpen) return null

  return (
    <div className="border-r bg-background transition-all duration-200 h-full flex flex-col w-72">
      <div className="p-4 border-b flex flex-col gap-3">
        <Button onClick={onCreateNewChat} variant="default" className="w-full justify-start">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
        <Form {...searchForm}>
          <form className="relative">
            <FormField
              control={searchForm.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search chats..."
                        className="pl-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {filteredThreads.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {searchQuery ? "No chats match your search" : "No chats yet"}
            </div>
          ) : (
            filteredThreads?.map((thread) => (
              <div
                key={thread.id}
                className={`group flex items-center justify-between rounded-md px-3 py-2 cursor-pointer ${
                  thread.id === activeThreadId ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => onSelectThread(thread.id)}
              >
                <div className="flex items-center flex-1 overflow-hidden">
                  <MessageSquare className="h-4 w-4 mr-2 shrink-0" />
                  <span className="truncate">{thread.name}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity ${
                        thread.id === activeThreadId
                          ? "text-primary-foreground hover:text-primary-foreground"
                          : ""
                      }`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        const newName = prompt("Rename chat", thread.name)
                        if (newName && newName.trim()) {
                          onRenameThread(thread.id, newName.trim())
                        }
                      }}
                    >
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (confirm("Are you sure you want to delete this chat?")) {
                          onDeleteThread(thread.id)
                        }
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}