// @/services/subscriptions-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  SubscriptionsCreateInput, SubscriptionsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetSubscriptions() {
  return useMutation({
    mutationFn: subscriptionsService.findMany,
    onSuccess: () => {
      toast.success("Subscriptionss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateSubscriptions() {
  const router = useRouter();
  return useMutation({
    mutationFn: subscriptionsService.create,
    onSuccess: () => {
      toast.success("Subscriptions created successfully");
      router.push("/subscriptions");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateSubscriptions() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: SubscriptionsUpdateInput }) => 
      subscriptionsService.update(id, data),
    onSuccess: () => {
      toast.success("Subscriptions updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteSubscriptions() {
  return useMutation({
    mutationFn: (id: string) => subscriptionsService.delete(id),
    onSuccess: () => {
      toast.success("Subscriptions deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManySubscriptions() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: SubscriptionsCreateInput, data: SubscriptionsUpdateInput }) => 
      subscriptionsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Subscriptionss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManySubscriptions() {
  return useMutation({
    mutationFn: (filter: SubscriptionsCreateInput) => subscriptionsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Subscriptionss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const subscriptionsService: ApiService["subscriptions"] = {
  baseRoute: "/api/subscriptions",
  routes: {
    fetchMany: (params) => toUrl(subscriptionsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(subscriptionsService.baseRoute, { params: { id } }),
    create: () => subscriptionsService.baseRoute,
    update: (id: string | number) => toUrl(subscriptionsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(subscriptionsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(subscriptionsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(subscriptionsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(subscriptionsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch subscriptionss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(subscriptionsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch subscriptions");
    return res.json();
  },
  create: async (data: SubscriptionsCreateInput) => {
    const res = await fetch(subscriptionsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create subscriptions");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<SubscriptionsUpdateInput>) => {
    const res = await fetch(subscriptionsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update subscriptions");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(subscriptionsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete subscriptions");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(subscriptionsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated subscriptionss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(subscriptionsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count subscriptionss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: SubscriptionsCreateInput[]) => {
    const res = await fetch(subscriptionsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple subscriptionss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<SubscriptionsUpdateInput>) => {
    const res = await fetch(subscriptionsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple subscriptionss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(subscriptionsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple subscriptionss");
    }
    return res.json();
  }
};



