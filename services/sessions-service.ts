// @/services/sessions-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  SessionsCreateInput, SessionsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetSessions() {
  return useMutation({
    mutationFn: sessionsService.findMany,
    onSuccess: () => {
      toast.success("Sessionss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateSessions() {
  const router = useRouter();
  return useMutation({
    mutationFn: sessionsService.create,
    onSuccess: () => {
      toast.success("Sessions created successfully");
      router.push("/sessions");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateSessions() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: SessionsUpdateInput }) => 
      sessionsService.update(id, data),
    onSuccess: () => {
      toast.success("Sessions updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteSessions() {
  return useMutation({
    mutationFn: (id: string) => sessionsService.delete(id),
    onSuccess: () => {
      toast.success("Sessions deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManySessions() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: SessionsCreateInput, data: SessionsUpdateInput }) => 
      sessionsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Sessionss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManySessions() {
  return useMutation({
    mutationFn: (filter: SessionsCreateInput) => sessionsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Sessionss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const sessionsService: ApiService["sessions"] = {
  baseRoute: "/api/sessions",
  routes: {
    fetchMany: (params) => toUrl(sessionsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(sessionsService.baseRoute, { params: { id } }),
    create: () => sessionsService.baseRoute,
    update: (id: string | number) => toUrl(sessionsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(sessionsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(sessionsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(sessionsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(sessionsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch sessionss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(sessionsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch sessions");
    return res.json();
  },
  create: async (data: SessionsCreateInput) => {
    const res = await fetch(sessionsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create sessions");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<SessionsUpdateInput>) => {
    const res = await fetch(sessionsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update sessions");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(sessionsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete sessions");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(sessionsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated sessionss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(sessionsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count sessionss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: SessionsCreateInput[]) => {
    const res = await fetch(sessionsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple sessionss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<SessionsUpdateInput>) => {
    const res = await fetch(sessionsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple sessionss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(sessionsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple sessionss");
    }
    return res.json();
  }
};



