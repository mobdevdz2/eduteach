// @/services/organizations-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  OrganizationsCreateInput, OrganizationsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetOrganizations() {
  return useMutation({
    mutationFn: organizationsService.findMany,
    onSuccess: () => {
      toast.success("Organizationss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateOrganizations() {
  const router = useRouter();
  return useMutation({
    mutationFn: organizationsService.create,
    onSuccess: () => {
      toast.success("Organizations created successfully");
      router.push("/organizations");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateOrganizations() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: OrganizationsUpdateInput }) => 
      organizationsService.update(id, data),
    onSuccess: () => {
      toast.success("Organizations updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteOrganizations() {
  return useMutation({
    mutationFn: (id: string) => organizationsService.delete(id),
    onSuccess: () => {
      toast.success("Organizations deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyOrganizations() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: OrganizationsCreateInput, data: OrganizationsUpdateInput }) => 
      organizationsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("Organizationss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyOrganizations() {
  return useMutation({
    mutationFn: (filter: OrganizationsCreateInput) => organizationsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("Organizationss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const organizationsService: ApiService["organizations"] = {
  baseRoute: "/api/organizations",
  routes: {
    fetchMany: (params) => toUrl(organizationsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(organizationsService.baseRoute, { params: { id } }),
    create: () => organizationsService.baseRoute,
    update: (id: string | number) => toUrl(organizationsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(organizationsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(organizationsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(organizationsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(organizationsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch organizationss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(organizationsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch organizations");
    return res.json();
  },
  create: async (data: OrganizationsCreateInput) => {
    const res = await fetch(organizationsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create organizations");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<OrganizationsUpdateInput>) => {
    const res = await fetch(organizationsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update organizations");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(organizationsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete organizations");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(organizationsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated organizationss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(organizationsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count organizationss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: OrganizationsCreateInput[]) => {
    const res = await fetch(organizationsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple organizationss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<OrganizationsUpdateInput>) => {
    const res = await fetch(organizationsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple organizationss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(organizationsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple organizationss");
    }
    return res.json();
  }
};



