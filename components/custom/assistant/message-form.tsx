import { PaperclipIcon, Trash2, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/custom/assistant/file-uploader"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React from "react"

// Form schema
const chatFormSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
})

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
}

interface MessageFormProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  submitMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  assistantStatus: string
  uploadedFiles: UploadedFile[]
  handleFileUpload: (files: File[], fileIds: string[]) => Promise<void>
  removeFile: (fileId: string) => void
  openaiThreadId: string | null
  onMessageSubmit?: () => void
}

export default function MessageForm({
  input,
  handleInputChange,
  submitMessage,
  assistantStatus,
  uploadedFiles,
  handleFileUpload,
  removeFile,
  openaiThreadId,
  onMessageSubmit,
}: MessageFormProps) {
  // Form setup
  const chatForm = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      message: "",
    },
  })

  // Handle form submission
  const onChatSubmit = async (data: z.infer<typeof chatFormSchema>) => {
    await submitMessage(new Event("submit") as any)
    if (onMessageSubmit) {
      onMessageSubmit()
    }
  }

  // Update form value when input changes
  React.useEffect(() => {
    chatForm.setValue("message", input)
  }, [input, chatForm])

  return (
    <>
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
        <Form {...chatForm}>
          <form onSubmit={chatForm.handleSubmit(onChatSubmit)} className="flex items-end gap-2">
            <FormField
              control={chatForm.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      {...field}
                      value={input}
                      onChange={(e) => {
                        handleInputChange(e);
                        field.onChange(e);
                      }}
                      placeholder="Ask anything about teaching, lesson planning, or educational content..."
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <FileUploader
                onUpload={handleFileUpload}
                threadId={openaiThreadId || undefined}
                disabled={assistantStatus === "in_progress"}
              />
              <Button type="submit" size="icon" disabled={assistantStatus === "in_progress" || !input.trim()}>
                {assistantStatus === "in_progress" ? 
                  <Loader2 className="h-4 w-4 animate-spin" /> : 
                  <Send className="h-4 w-4" />
                }
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}