// @/services/assignments-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  AssignmentsCreateInput, AssignmentsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetAssignments() {
  return useMutation({
    mutationFn: assignmentsService.findMany,
    onSuccess: () => {
      toast.success("Assignmentss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateAssignments() {
  const router = useRouter();
  return useMutation({
    mutationFn: assignmentsService.create,
    onSuccess: () => {
      toast.success("Assignments created successfully");
      router.push("/assignments");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateAssignments() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: AssignmentsUpdateInput }) => 
      assignmentsService.update(id, data),
    onSuccess: () => {
      toast.success("Assignments updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteAssignments() {
  return useMutation({
    mutationFn: (id: string) => assignmentsService.delete(id),
    onSuccess: () => {
      toast.success("Assignments deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyAssignments() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: AssignmentsCreateInput, data: AssignmentsUpdateInput }) => 
      assignmentsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Assignmentss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyAssignments() {
  return useMutation({
    mutationFn: (filter: AssignmentsCreateInput) => assignmentsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Assignmentss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const assignmentsService: ApiService["assignments"] = {
  baseRoute: "/api/assignments",
  routes: {
    fetchMany: (params) => toUrl(assignmentsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(assignmentsService.baseRoute, { params: { id } }),
    create: () => assignmentsService.baseRoute,
    update: (id: string | number) => toUrl(assignmentsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(assignmentsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(assignmentsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(assignmentsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(assignmentsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch assignmentss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(assignmentsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch assignments");
    return res.json();
  },
  create: async (data: AssignmentsCreateInput) => {
    const res = await fetch(assignmentsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create assignments");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<AssignmentsUpdateInput>) => {
    const res = await fetch(assignmentsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update assignments");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(assignmentsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete assignments");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(assignmentsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated assignmentss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(assignmentsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count assignmentss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: AssignmentsCreateInput[]) => {
    const res = await fetch(assignmentsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple assignmentss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<AssignmentsUpdateInput>) => {
    const res = await fetch(assignmentsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple assignmentss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(assignmentsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple assignmentss");
    }
    return res.json();
  }
};



