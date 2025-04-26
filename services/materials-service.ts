// @/services/materials-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  MaterialsCreateInput, MaterialsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetMaterials() {
  return useMutation({
    mutationFn: materialsService.findMany,
    onSuccess: () => {
      toast.success("Materialss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateMaterials() {
  const router = useRouter();
  return useMutation({
    mutationFn: materialsService.create,
    onSuccess: () => {
      toast.success("Materials created successfully");
      router.push("/materials");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateMaterials() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: MaterialsUpdateInput }) => 
      materialsService.update(id, data),
    onSuccess: () => {
      toast.success("Materials updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteMaterials() {
  return useMutation({
    mutationFn: (id: string) => materialsService.delete(id),
    onSuccess: () => {
      toast.success("Materials deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyMaterials() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: MaterialsCreateInput, data: MaterialsUpdateInput }) => 
      materialsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Materialss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyMaterials() {
  return useMutation({
    mutationFn: (filter: MaterialsCreateInput) => materialsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Materialss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const materialsService: ApiService["materials"] = {
  baseRoute: "/api/materials",
  routes: {
    fetchMany: (params) => toUrl(materialsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(materialsService.baseRoute, { params: { id } }),
    create: () => materialsService.baseRoute,
    update: (id: string | number) => toUrl(materialsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(materialsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(materialsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(materialsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(materialsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch materialss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(materialsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch materials");
    return res.json();
  },
  create: async (data: MaterialsCreateInput) => {
    const res = await fetch(materialsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create materials");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<MaterialsUpdateInput>) => {
    const res = await fetch(materialsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update materials");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(materialsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete materials");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(materialsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated materialss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(materialsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count materialss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: MaterialsCreateInput[]) => {
    const res = await fetch(materialsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple materialss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<MaterialsUpdateInput>) => {
    const res = await fetch(materialsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple materialss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(materialsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple materialss");
    }
    return res.json();
  }
};



