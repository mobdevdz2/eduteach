"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { ApiService } from "@/types/services"
import { toUrl } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { chats } from "@/db/schema"



export interface ChatThreadCreateInput {
  name: string
}

export interface ChatThreadUpdateInput {
  name?: string
  isArchived?: boolean
  category?: string
}

// React Query hooks for chat threads
export function useGetChatThreads() {
  return useMutation({
    mutationFn:  chatService.findMany,
    onSuccess: (data) => {
      toast.success("Chat threads fetched successfully")
      return data
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })
}

export function useCreateChatThread() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: chatService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["chatThreads"] })
      toast.success("Chat created successfully")
      return data
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateChatThread() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ChatThreadUpdateInput }) => chatService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatThreads"] })
      toast.success("Chat updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useDeleteChatThread() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => chatService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatThreads"] })
      toast.success("Chat deleted successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useGetChatThread(id: string) {
  return useMutation({
    mutationFn: () => chatService.findFirst({ id }),
    onSuccess: (data) => {
      toast.success("Chat thread fetched successfully")
      return data
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }})
}

// Service implementation
export const chatService: ApiService["chats"] = {
  baseRoute: "/api/assistant/threads",
  routes: {
    fetchMany: (params) => toUrl(chatService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(`${chatService.baseRoute}/${id}`),
    create: () => chatService.baseRoute,
    update: (id: string | number) => toUrl(`${chatService.baseRoute}/${id}`),
    delete: (id: string | number) => toUrl(`${chatService.baseRoute}/${id}`),
    updateMany: (filter) => toUrl(chatService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(chatService.baseRoute, { params: { filter } }),
  },
  findMany: async (params) => {
    const res = await fetch(chatService.routes.fetchMany(params))
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to fetch chat threads")
    }
    return res.json()
  },
  findFirst: async (params) => {
    const res = await fetch(chatService.routes.fetchById(params.id!))
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to fetch chat thread")
    }
    return res.json()
  },
  create: async (data: ChatThreadCreateInput) => {
    const res = await fetch(chatService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to create chat thread")
    }
    return res.json()
  },
  update: async (id: string | number, data: Partial<ChatThreadUpdateInput>) => {
    const res = await fetch(chatService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to update chat thread")
    }
    return res.json()
  },
  delete: async (id: string | number) => {
    const res = await fetch(chatService.routes.delete(id), {
      method: "DELETE",
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to delete chat thread")
    }
    return true
  },

  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize }
    const res = await fetch(chatService.routes.fetchMany(queryParams))
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to fetch paginated chat threads")
    }
    return res.json()
  },
  count: async (params) => {
    const queryParams = { ...params, count: true }
    const res = await fetch(chatService.routes.fetchMany(queryParams))
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to count chat threads")
    }
    const data = await res.json()
    return data.count
  },
  createMany: async (data: ChatThreadCreateInput[]) => {
    const res = await fetch(chatService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to create multiple chat threads")
    }
    return res.json()
  },
  updateMany: async (filter, data: Partial<ChatThreadUpdateInput>) => {
    const res = await fetch(chatService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to update multiple chat threads")
    }
    return res.json()
  },
  deleteMany: async (filter) => {
    const res = await fetch(chatService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to delete multiple chat threads")
    }
    return res.json()
  },
}

// Service for assistant-related operations
export function useCreateAssistant() {
  return useMutation({
    mutationFn: assistantService.create,
    onSuccess: () => {
      toast.success("Assistant created successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUploadFile() {
  return useMutation({
    mutationFn: assistantService.uploadFile,
    onSuccess: (data) => {
      toast.success("File uploaded successfully")
      return data
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export const assistantService = {
  create: async (userId: string) => {
    const res = await fetch("/api/assistant/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, name: `Teaching Assistant` }),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to create assistant")
    }

    return res.json()
  },

  uploadFile: async (data: { file: File; threadId?: string }) => {
    const formData = new FormData()
    formData.append("file", data.file)
    if (data.threadId) {
      formData.append("threadId", data.threadId)
    }

    const res = await fetch("/api/assistant/upload", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || "Failed to upload file")
    }

    return res.json()
  },
}
