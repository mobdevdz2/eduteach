// @/services/classes-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  ClassesCreateInput, ClassesUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetClasses() {
  return useMutation({
    mutationFn: classesService.findMany,
    onSuccess: () => {
      toast.success("Classess fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateClasses() {
  const router = useRouter();
  return useMutation({
    mutationFn: classesService.create,
    onSuccess: () => {
      toast.success("Classes created successfully");
      router.push("/classes");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateClasses() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: ClassesUpdateInput }) => 
      classesService.update(id, data),
    onSuccess: () => {
      toast.success("Classes updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteClasses() {
  return useMutation({
    mutationFn: (id: string) => classesService.delete(id),
    onSuccess: () => {
      toast.success("Classes deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyClasses() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: ClassesCreateInput, data: ClassesUpdateInput }) => 
      classesService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Classess updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyClasses() {
  return useMutation({
    mutationFn: (filter: ClassesCreateInput) => classesService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Classess deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const classesService: ApiService["classes"] = {
  baseRoute: "/api/classes",
  routes: {
    fetchMany: (params) => toUrl(classesService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(classesService.baseRoute, { params: { id } }),
    create: () => classesService.baseRoute,
    update: (id: string | number) => toUrl(classesService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(classesService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(classesService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(classesService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(classesService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch classess");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(classesService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch classes");
    return res.json();
  },
  create: async (data: ClassesCreateInput) => {
    const res = await fetch(classesService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create classes");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<ClassesUpdateInput>) => {
    const res = await fetch(classesService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update classes");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(classesService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete classes");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(classesService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated classess");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(classesService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count classess");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: ClassesCreateInput[]) => {
    const res = await fetch(classesService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple classess");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<ClassesUpdateInput>) => {
    const res = await fetch(classesService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple classess");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(classesService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple classess");
    }
    return res.json();
  }
};



