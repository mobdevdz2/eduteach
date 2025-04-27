"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface FileUploaderProps {
  onUpload: (files: File[], fileIds: string[]) => void
  threadId?: string
  disabled?: boolean
}

export function FileUploader({ onUpload, threadId, disabled = false }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)
      uploadFiles(files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      uploadFiles(files)
    }
  }

  const uploadFiles = async (files: File[]) => {
    // Check file size (limit to 20MB per file)
    const maxSize = 20 * 1024 * 1024 // 20MB
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`File ${file.name} exceeds the 20MB limit`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    setIsUploading(true)

    try {
      const fileIds: string[] = []

      // Upload each file to OpenAI via our API
      for (const file of validFiles) {
        const formData = new FormData()
        formData.append("file", file)
        if (threadId) {
          formData.append("threadId", threadId)
        }

        const response = await fetch("/api/assistant/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || `Failed to upload ${file.name}`)
        }

        const data = await response.json()
        fileIds.push(data.id)
      }

      // Call the onUpload callback with the files and their IDs
      onUpload(validFiles, fileIds)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      toast.success(`${validFiles.length} file(s) uploaded successfully`)
    } catch (error) {
      toast.error(`Upload error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" multiple />
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${isDragging ? "border-primary" : ""}`}
        title="Upload file"
        disabled={disabled || isUploading}
      >
        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
      </Button>
    </>
  )
}
