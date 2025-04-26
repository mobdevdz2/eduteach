// @/services/users-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  UsersCreateInput, UsersUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetUsers() {
  return useMutation({
    mutationFn: usersService.findMany,
    onSuccess: () => {
      toast.success("Userss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateUsers() {
  const router = useRouter();
  return useMutation({
    mutationFn: usersService.create,
    onSuccess: () => {
      toast.success("Users created successfully");
      router.push("/users");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateUsers() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UsersUpdateInput }) => 
      usersService.update(id, data),
    onSuccess: () => {
      toast.success("Users updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteUsers() {
  return useMutation({
    mutationFn: (id: string) => usersService.delete(id),
    onSuccess: () => {
      toast.success("Users deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyUsers() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: UsersCreateInput, data: UsersUpdateInput }) => 
      usersService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Userss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyUsers() {
  return useMutation({
    mutationFn: (filter: UsersCreateInput) => usersService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Userss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const usersService: ApiService["users"] = {
  baseRoute: "/api/users",
  routes: {
    fetchMany: (params) => toUrl(usersService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(usersService.baseRoute, { params: { id } }),
    create: () => usersService.baseRoute,
    update: (id: string | number) => toUrl(usersService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(usersService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(usersService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(usersService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(usersService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch userss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(usersService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },
  create: async (data: UsersCreateInput) => {
    const res = await fetch(usersService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create users");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<UsersUpdateInput>) => {
    const res = await fetch(usersService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update users");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(usersService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete users");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(usersService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated userss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(usersService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count userss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: UsersCreateInput[]) => {
    const res = await fetch(usersService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple userss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<UsersUpdateInput>) => {
    const res = await fetch(usersService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple userss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(usersService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple userss");
    }
    return res.json();
  }
};



