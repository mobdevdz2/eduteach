"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileUploader } from "./file-uploader"
import { Loader2, FileText, Trash2, Upload, Download, PlusCircle } from "lucide-react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface SavedFile {
  id: string
  name: string
  url: string
  createdAt: string
  size: number
  type: string
}

interface SavedFilesListProps {
  userId: string
  onUseFile: (file: File) => void
}

export function SavedFilesList({ userId, onUseFile }: SavedFilesListProps) {
  const [files, setFiles] = useState<SavedFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  useEffect(() => {
    if (userId) {
      fetchSavedFiles()
    }
  }, [userId])

  const fetchSavedFiles = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/files?userId=${userId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch files")
      }
      const data = await response.json()
      setFiles(data)
    } catch (error) {
      toast.error(`Error fetching files: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (files: File[]) => {
    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("userId", userId)
        formData.append("fileName", file.name)

        const response = await fetch("/api/files/save", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }
      }

      toast.success(`${files.length} file(s) uploaded successfully`)
      fetchSavedFiles()
      setIsUploadDialogOpen(false)
    } catch (error) {
      toast.error(`Error uploading files: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  const deleteFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete file")
      }

      setFiles(files.filter((file) => file.id !== fileId))
      toast.success("File deleted successfully")
    } catch (error) {
      toast.error(`Error deleting file: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  const downloadFile = async (file: SavedFile) => {
    try {
      const response = await fetch(file.url)
      if (!response.ok) {
        throw new Error("Failed to download file")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      toast.error(`Error downloading file: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  const useFileInChat = useCallback(
    async (file: SavedFile) => {
      try {
        const response = await fetch(file.url)
        if (!response.ok) {
          throw new Error("Failed to fetch file")
        }

        const blob = await response.blob()
        const fileObj = new File([blob], file.name, { type: file.type })
        onUseFile(fileObj)
      } catch (error) {
        toast.error(`Error using file: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    },
    [onUseFile],
  )

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Saved Files</h2>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Files</DialogTitle>
            </DialogHeader>
            <div className="border-2 border-dashed rounded-lg p-10 text-center">
              <div className="flex flex-col items-center gap-4">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <div>
                  <p className="font-medium">Drag and drop files here</p>
                  <p className="text-sm text-muted-foreground">Or click to browse files</p>
                </div>
                <FileUploader onUpload={handleFileUpload} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        placeholder="Search files..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredFiles.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <FileText className="h-10 w-10 text-muted-foreground" />
            <h3 className="font-medium">No files found</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? "Try a different search term" : "Upload files to get started"}
            </p>
          </div>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {new Date(file.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => useFileInChat(file)}
                      title="Use in chat"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => downloadFile(file)}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => deleteFile(file.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
