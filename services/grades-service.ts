// @/services/grades-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  GradesCreateInput, GradesUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetGrades() {
  return useMutation({
    mutationFn: gradesService.findMany,
    onSuccess: () => {
      toast.success("Gradess fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateGrades() {
  const router = useRouter();
  return useMutation({
    mutationFn: gradesService.create,
    onSuccess: () => {
      toast.success("Grades created successfully");
      router.push("/grades");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateGrades() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: GradesUpdateInput }) => 
      gradesService.update(id, data),
    onSuccess: () => {
      toast.success("Grades updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteGrades() {
  return useMutation({
    mutationFn: (id: string) => gradesService.delete(id),
    onSuccess: () => {
      toast.success("Grades deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyGrades() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: GradesCreateInput, data: GradesUpdateInput }) => 
      gradesService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Gradess updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyGrades() {
  return useMutation({
    mutationFn: (filter: GradesCreateInput) => gradesService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Gradess deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const gradesService: ApiService["grades"] = {
  baseRoute: "/api/grades",
  routes: {
    fetchMany: (params) => toUrl(gradesService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(gradesService.baseRoute, { params: { id } }),
    create: () => gradesService.baseRoute,
    update: (id: string | number) => toUrl(gradesService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(gradesService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(gradesService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(gradesService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(gradesService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch gradess");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(gradesService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch grades");
    return res.json();
  },
  create: async (data: GradesCreateInput) => {
    const res = await fetch(gradesService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create grades");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<GradesUpdateInput>) => {
    const res = await fetch(gradesService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update grades");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(gradesService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete grades");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(gradesService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated gradess");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(gradesService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count gradess");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: GradesCreateInput[]) => {
    const res = await fetch(gradesService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple gradess");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<GradesUpdateInput>) => {
    const res = await fetch(gradesService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple gradess");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(gradesService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple gradess");
    }
    return res.json();
  }
};



