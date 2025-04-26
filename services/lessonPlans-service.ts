// @/services/lessonPlans-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  LessonPlansCreateInput, LessonPlansUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetLessonPlans() {
  return useMutation({
    mutationFn: lessonPlansService.findMany,
    onSuccess: () => {
      toast.success("LessonPlanss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateLessonPlans() {
  const router = useRouter();
  return useMutation({
    mutationFn: lessonPlansService.create,
    onSuccess: () => {
      toast.success("LessonPlans created successfully");
      router.push("/lessonPlans");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateLessonPlans() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: LessonPlansUpdateInput }) => 
      lessonPlansService.update(id, data),
    onSuccess: () => {
      toast.success("LessonPlans updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteLessonPlans() {
  return useMutation({
    mutationFn: (id: string) => lessonPlansService.delete(id),
    onSuccess: () => {
      toast.success("LessonPlans deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyLessonPlans() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: LessonPlansCreateInput, data: LessonPlansUpdateInput }) => 
      lessonPlansService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("LessonPlanss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyLessonPlans() {
  return useMutation({
    mutationFn: (filter: LessonPlansCreateInput) => lessonPlansService.deleteMany(filter),
    onSuccess: () => {
      toast.success("LessonPlanss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const lessonPlansService: ApiService["lessonPlans"] = {
  baseRoute: "/api/lessonPlans",
  routes: {
    fetchMany: (params) => toUrl(lessonPlansService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(lessonPlansService.baseRoute, { params: { id } }),
    create: () => lessonPlansService.baseRoute,
    update: (id: string | number) => toUrl(lessonPlansService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(lessonPlansService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(lessonPlansService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(lessonPlansService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(lessonPlansService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch lessonPlanss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(lessonPlansService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch lessonPlans");
    return res.json();
  },
  create: async (data: LessonPlansCreateInput) => {
    const res = await fetch(lessonPlansService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create lessonPlans");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<LessonPlansUpdateInput>) => {
    const res = await fetch(lessonPlansService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update lessonPlans");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(lessonPlansService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete lessonPlans");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(lessonPlansService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated lessonPlanss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(lessonPlansService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count lessonPlanss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: LessonPlansCreateInput[]) => {
    const res = await fetch(lessonPlansService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple lessonPlanss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<LessonPlansUpdateInput>) => {
    const res = await fetch(lessonPlansService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple lessonPlanss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(lessonPlansService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple lessonPlanss");
    }
    return res.json();
  }
};



