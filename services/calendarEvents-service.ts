// @/services/calendarEvents-service
"use client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiService } from "@/types/services";
import {  CalendarEventsCreateInput, CalendarEventsUpdateInput } from "@/types/entities";
import { toUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function useGetCalendarEvents() {
  return useMutation({
    mutationFn: calendarEventsService.findMany,
    onSuccess: () => {
      toast.success("CalendarEventss fetched successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateCalendarEvents() {
  const router = useRouter();
  return useMutation({
    mutationFn: calendarEventsService.create,
    onSuccess: () => {
      toast.success("CalendarEvents created successfully");
      router.push("/calendar-events");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateCalendarEvents() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: CalendarEventsUpdateInput }) => 
      calendarEventsService.update(id, data),
    onSuccess: () => {
      toast.success("CalendarEvents updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteCalendarEvents() {
  return useMutation({
    mutationFn: (id: string) => calendarEventsService.delete(id),
    onSuccess: () => {
      toast.success("CalendarEvents deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateManyCalendarEvents() {
  return useMutation({
    mutationFn: ({ filter, data }: { filter: CalendarEventsCreateInput, data: CalendarEventsUpdateInput }) => 
      calendarEventsService.updateMany(filter, data),
    onSuccess: () => {
      toast.success("CalendarEventss updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteManyCalendarEvents() {
  return useMutation({
    mutationFn: (filter: CalendarEventsCreateInput) => calendarEventsService.deleteMany(filter),
    onSuccess: () => {
      toast.success("CalendarEventss deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const calendarEventsService: ApiService["calendarEvents"] = {
  baseRoute: "/api/calendarEvents",
  routes: {
    fetchMany: (params) => toUrl(calendarEventsService.baseRoute, params),
    fetchById: (id: string | number) => toUrl(calendarEventsService.baseRoute, { params: { id } }),
    create: () => calendarEventsService.baseRoute,
    update: (id: string | number) => toUrl(calendarEventsService.baseRoute, { params: { id } }),
    delete: (id: string | number) => toUrl(calendarEventsService.baseRoute, { params: { id } }),
    updateMany: (filter) => toUrl(calendarEventsService.baseRoute, { params: { filter } }),
    deleteMany: (filter) => toUrl(calendarEventsService.baseRoute, { params: { filter } })
  },
  findMany: async (params) => {
    const res = await fetch(calendarEventsService.routes.fetchMany(params));
    if (!res.ok) throw new Error("Failed to fetch calendarEventss");
    return res.json();
  },
  findFirst: async (params) => {
    const res = await fetch(calendarEventsService.routes.fetchById(params.id!));
    if (!res.ok) throw new Error("Failed to fetch calendarEvents");
    return res.json();
  },
  create: async (data: CalendarEventsCreateInput) => {
    const res = await fetch(calendarEventsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create calendarEvents");
    }
    return res.json();
  },
  update: async (id: string | number, data: Partial<CalendarEventsUpdateInput>) => {
    const res = await fetch(calendarEventsService.routes.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update calendarEvents");
    }
    return res.json();
  },
  delete: async (id: string | number) => {
    const res = await fetch(calendarEventsService.routes.delete(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete calendarEvents");
    return true;
  },
  
  // Adding the required additional methods to match the ApiService type
  findManyPaginated: async (page = 1, pageSize = 10, params) => {
    const queryParams = { ...params, page, pageSize };
    const res = await fetch(calendarEventsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to fetch paginated calendarEventss");
    return res.json();
  },
  count: async (params) => {
    const queryParams = { ...params, count: true };
    const res = await fetch(calendarEventsService.routes.fetchMany(queryParams));
    if (!res.ok) throw new Error("Failed to count calendarEventss");
    const data = await res.json();
    return data.count;
  },
  createMany: async (data: CalendarEventsCreateInput[]) => {
    const res = await fetch(calendarEventsService.routes.create(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create multiple calendarEventss");
    }
    return res.json();
  },
  updateMany: async (filter, data: Partial<CalendarEventsUpdateInput>) => {
    const res = await fetch(calendarEventsService.routes.updateMany(filter), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update multiple calendarEventss");
    }
    return res.json();
  },
  deleteMany: async (filter) => {
    const res = await fetch(calendarEventsService.routes.deleteMany(filter), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete multiple calendarEventss");
    }
    return res.json();
  }
};



