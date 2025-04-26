// @/services/classStudents-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  ClassStudentsCreateInput, ClassStudentsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetClassStudents() {
  return useMutation({
    mutationFn: classStudentsService.findMany,
    onSuccess: () => {
      toast.success("ClassStudentss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateClassStudents() {
  const router = useRouter();
  return useMutation({
    mutationFn: classStudentsService.create,
    onSuccess: () => {
      toast.success("ClassStudents created successfully");
      router.push("/classStudents");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateClassStudents() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: ClassStudentsUpdateInput }) => 
      classStudentsService.update(id, data),
    onSuccess: () => {
      toast.success("ClassStudents updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteClassStudents() {
  return useMutation({
    mutationFn: (id: string) => classStudentsService.delete(id),
    onSuccess: () => {
      toast.success("ClassStudents deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyClassStudents() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: ClassStudentsCreateInput, data: ClassStudentsUpdateInput }) => 
      classStudentsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("ClassStudentss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyClassStudents() {
  return useMutation({
    mutationFn: (filter: ClassStudentsCreateInput) => classStudentsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("ClassStudentss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const classStudentsService: ApiService["classStudents"] = {
  baseRoute: "/api/classStudents",
  routes: {
    fetchMany: (params) => toUrl(classStudentsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(classStudentsService.baseRoute, { params: { id } }),
    create: () => classStudentsService.baseRoute,
    update: (id: string | number) => toUrl(classStudentsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(classStudentsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(classStudentsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(classStudentsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(classStudentsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch classStudentss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(classStudentsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch classStudents");
    return res.json();
  },
  create: async (data: ClassStudentsCreateInput) => {
    const res = await fetch(classStudentsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create classStudents");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<ClassStudentsUpdateInput>) => {
    const res = await fetch(classStudentsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update classStudents");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(classStudentsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete classStudents");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(classStudentsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated classStudentss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(classStudentsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count classStudentss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: ClassStudentsCreateInput[]) => {
    const res = await fetch(classStudentsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple classStudentss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<ClassStudentsUpdateInput>) => {
    const res = await fetch(classStudentsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple classStudentss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(classStudentsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple classStudentss");
    }
    return res.json();
  }
};



