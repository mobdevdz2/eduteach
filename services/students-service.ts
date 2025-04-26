// @/services/students-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  StudentsCreateInput, StudentsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetStudents() {
  return useMutation({
    mutationFn: studentsService.findMany,
    onSuccess: () => {
      toast.success("Studentss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateStudents() {
  const router = useRouter();
  return useMutation({
    mutationFn: studentsService.create,
    onSuccess: () => {
      toast.success("Students created successfully");
      router.push("/students");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateStudents() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: StudentsUpdateInput }) => 
      studentsService.update(id, data),
    onSuccess: () => {
      toast.success("Students updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteStudents() {
  return useMutation({
    mutationFn: (id: string) => studentsService.delete(id),
    onSuccess: () => {
      toast.success("Students deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyStudents() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: StudentsCreateInput, data: StudentsUpdateInput }) => 
      studentsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Studentss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyStudents() {
  return useMutation({
    mutationFn: (filter: StudentsCreateInput) => studentsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Studentss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const studentsService: ApiService["students"] = {
  baseRoute: "/api/students",
  routes: {
    fetchMany: (params) => toUrl(studentsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(studentsService.baseRoute, { params: { id } }),
    create: () => studentsService.baseRoute,
    update: (id: string | number) => toUrl(studentsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(studentsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(studentsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(studentsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(studentsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch studentss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(studentsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch students");
    return res.json();
  },
  create: async (data: StudentsCreateInput) => {
    const res = await fetch(studentsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create students");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<StudentsUpdateInput>) => {
    const res = await fetch(studentsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update students");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(studentsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete students");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(studentsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated studentss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(studentsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count studentss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: StudentsCreateInput[]) => {
    const res = await fetch(studentsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple studentss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<StudentsUpdateInput>) => {
    const res = await fetch(studentsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple studentss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(studentsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple studentss");
    }
    return res.json();
  }
};



