// @/services/verificationTokens-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  VerificationTokensCreateInput, VerificationTokensUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetVerificationTokens() {
  return useMutation({
    mutationFn: verificationTokensService.findMany,
    onSuccess: () => {
      toast.success("VerificationTokenss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateVerificationTokens() {
  const router = useRouter();
  return useMutation({
    mutationFn: verificationTokensService.create,
    onSuccess: () => {
      toast.success("VerificationTokens created successfully");
      router.push("/verificationTokens");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateVerificationTokens() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: VerificationTokensUpdateInput }) => 
      verificationTokensService.update(id, data),
    onSuccess: () => {
      toast.success("VerificationTokens updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteVerificationTokens() {
  return useMutation({
    mutationFn: (id: string) => verificationTokensService.delete(id),
    onSuccess: () => {
      toast.success("VerificationTokens deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyVerificationTokens() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: VerificationTokensCreateInput, data: VerificationTokensUpdateInput }) => 
      verificationTokensService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("VerificationTokenss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyVerificationTokens() {
  return useMutation({
    mutationFn: (filter: VerificationTokensCreateInput) => verificationTokensService.deleteMany(filter),
    onSuccess: () => {
      toast.success("VerificationTokenss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const verificationTokensService: ApiService["verificationTokens"] = {
  baseRoute: "/api/verificationTokens",
  routes: {
    fetchMany: (params) => toUrl(verificationTokensService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(verificationTokensService.baseRoute, { params: { id } }),
    create: () => verificationTokensService.baseRoute,
    update: (id: string | number) => toUrl(verificationTokensService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(verificationTokensService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(verificationTokensService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(verificationTokensService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(verificationTokensService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch verificationTokenss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(verificationTokensService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch verificationTokens");
    return res.json();
  },
  create: async (data: VerificationTokensCreateInput) => {
    const res = await fetch(verificationTokensService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create verificationTokens");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<VerificationTokensUpdateInput>) => {
    const res = await fetch(verificationTokensService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update verificationTokens");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(verificationTokensService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete verificationTokens");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(verificationTokensService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated verificationTokenss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(verificationTokensService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count verificationTokenss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: VerificationTokensCreateInput[]) => {
    const res = await fetch(verificationTokensService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple verificationTokenss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<VerificationTokensUpdateInput>) => {
    const res = await fetch(verificationTokensService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple verificationTokenss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(verificationTokensService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple verificationTokenss");
    }
    return res.json();
  }
};



