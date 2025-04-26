// @/services/assignmentSubmissions-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  AssignmentSubmissionsCreateInput, AssignmentSubmissionsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetAssignmentSubmissions() {
  return useMutation({
    mutationFn: assignmentSubmissionsService.findMany,
    onSuccess: () => {
      toast.success("AssignmentSubmissionss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateAssignmentSubmissions() {
  const router = useRouter();
  return useMutation({
    mutationFn: assignmentSubmissionsService.create,
    onSuccess: () => {
      toast.success("AssignmentSubmissions created successfully");
      router.push("/assignmentSubmissions");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateAssignmentSubmissions() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: AssignmentSubmissionsUpdateInput }) => 
      assignmentSubmissionsService.update(id, data),
    onSuccess: () => {
      toast.success("AssignmentSubmissions updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteAssignmentSubmissions() {
  return useMutation({
    mutationFn: (id: string) => assignmentSubmissionsService.delete(id),
    onSuccess: () => {
      toast.success("AssignmentSubmissions deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyAssignmentSubmissions() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: AssignmentSubmissionsCreateInput, data: AssignmentSubmissionsUpdateInput }) => 
      assignmentSubmissionsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("AssignmentSubmissionss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyAssignmentSubmissions() {
  return useMutation({
    mutationFn: (filter: AssignmentSubmissionsCreateInput) => assignmentSubmissionsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("AssignmentSubmissionss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const assignmentSubmissionsService: ApiService["assignmentSubmissions"] = {
  baseRoute: "/api/assignmentSubmissions",
  routes: {
    fetchMany: (params) => toUrl(assignmentSubmissionsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(assignmentSubmissionsService.baseRoute, { params: { id } }),
    create: () => assignmentSubmissionsService.baseRoute,
    update: (id: string | number) => toUrl(assignmentSubmissionsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(assignmentSubmissionsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(assignmentSubmissionsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(assignmentSubmissionsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(assignmentSubmissionsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch assignmentSubmissionss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(assignmentSubmissionsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch assignmentSubmissions");
    return res.json();
  },
  create: async (data: AssignmentSubmissionsCreateInput) => {
    const res = await fetch(assignmentSubmissionsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create assignmentSubmissions");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<AssignmentSubmissionsUpdateInput>) => {
    const res = await fetch(assignmentSubmissionsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update assignmentSubmissions");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(assignmentSubmissionsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete assignmentSubmissions");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(assignmentSubmissionsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated assignmentSubmissionss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(assignmentSubmissionsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count assignmentSubmissionss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: AssignmentSubmissionsCreateInput[]) => {
    const res = await fetch(assignmentSubmissionsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple assignmentSubmissionss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<AssignmentSubmissionsUpdateInput>) => {
    const res = await fetch(assignmentSubmissionsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple assignmentSubmissionss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(assignmentSubmissionsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple assignmentSubmissionss");
    }
    return res.json();
  }
};



