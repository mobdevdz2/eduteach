// @/services/accounts-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  AccountsCreateInput, AccountsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetAccounts() {
  return useMutation({
    mutationFn: accountsService.findMany,
    onSuccess: () => {
      toast.success("Accountss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateAccounts() {
  const router = useRouter();
  return useMutation({
    mutationFn: accountsService.create,
    onSuccess: () => {
      toast.success("Accounts created successfully");
      router.push("/accounts");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateAccounts() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: AccountsUpdateInput }) => 
      accountsService.update(id, data),
    onSuccess: () => {
      toast.success("Accounts updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteAccounts() {
  return useMutation({
    mutationFn: (id: string) => accountsService.delete(id),
    onSuccess: () => {
      toast.success("Accounts deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyAccounts() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: AccountsCreateInput, data: AccountsUpdateInput }) => 
      accountsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Accountss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyAccounts() {
  return useMutation({
    mutationFn: (filter: AccountsCreateInput) => accountsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Accountss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const accountsService: ApiService["accounts"] = {
  baseRoute: "/api/accounts",
  routes: {
    fetchMany: (params) => toUrl(accountsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(accountsService.baseRoute, { params: { id } }),
    create: () => accountsService.baseRoute,
    update: (id: string | number) => toUrl(accountsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(accountsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(accountsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(accountsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(accountsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch accountss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(accountsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch accounts");
    return res.json();
  },
  create: async (data: AccountsCreateInput) => {
    const res = await fetch(accountsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create accounts");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<AccountsUpdateInput>) => {
    const res = await fetch(accountsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update accounts");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(accountsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete accounts");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(accountsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated accountss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(accountsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count accountss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: AccountsCreateInput[]) => {
    const res = await fetch(accountsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple accountss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<AccountsUpdateInput>) => {
    const res = await fetch(accountsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple accountss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(accountsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple accountss");
    }
    return res.json();
  }
};



