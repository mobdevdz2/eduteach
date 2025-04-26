// @/services/featureLimits-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  FeatureLimitsCreateInput, FeatureLimitsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetFeatureLimits() {
  return useMutation({
    mutationFn: featureLimitsService.findMany,
    onSuccess: () => {
      toast.success("FeatureLimitss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateFeatureLimits() {
  const router = useRouter();
  return useMutation({
    mutationFn: featureLimitsService.create,
    onSuccess: () => {
      toast.success("FeatureLimits created successfully");
      router.push("/featureLimits");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateFeatureLimits() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: FeatureLimitsUpdateInput }) => 
      featureLimitsService.update(id, data),
    onSuccess: () => {
      toast.success("FeatureLimits updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteFeatureLimits() {
  return useMutation({
    mutationFn: (id: string) => featureLimitsService.delete(id),
    onSuccess: () => {
      toast.success("FeatureLimits deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyFeatureLimits() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: FeatureLimitsCreateInput, data: FeatureLimitsUpdateInput }) => 
      featureLimitsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("FeatureLimitss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyFeatureLimits() {
  return useMutation({
    mutationFn: (filter: FeatureLimitsCreateInput) => featureLimitsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("FeatureLimitss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const featureLimitsService: ApiService["featureLimits"] = {
  baseRoute: "/api/featureLimits",
  routes: {
    fetchMany: (params) => toUrl(featureLimitsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(featureLimitsService.baseRoute, { params: { id } }),
    create: () => featureLimitsService.baseRoute,
    update: (id: string | number) => toUrl(featureLimitsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(featureLimitsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(featureLimitsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(featureLimitsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(featureLimitsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch featureLimitss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(featureLimitsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch featureLimits");
    return res.json();
  },
  create: async (data: FeatureLimitsCreateInput) => {
    const res = await fetch(featureLimitsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create featureLimits");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<FeatureLimitsUpdateInput>) => {
    const res = await fetch(featureLimitsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update featureLimits");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(featureLimitsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete featureLimits");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(featureLimitsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated featureLimitss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(featureLimitsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count featureLimitss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: FeatureLimitsCreateInput[]) => {
    const res = await fetch(featureLimitsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple featureLimitss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<FeatureLimitsUpdateInput>) => {
    const res = await fetch(featureLimitsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple featureLimitss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(featureLimitsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple featureLimitss");
    }
    return res.json();
  }
};



