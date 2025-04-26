import { clsx, type ClassValue } from "clsx";
import { SearchParams } from "next/dist/server/request/search-params";
import { twMerge } from "tailwind-merge";
// import html2pdf from "html2pdf.js";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToSearchParams = (urlSearchParams: URLSearchParams) => {
  const searchParams: SearchParams = {};
  urlSearchParams.forEach((value, key) => {
    searchParams[key] = urlSearchParams.get(key) || undefined;
  });
  return searchParams;
};

export const toUrlSearchParams = (searchParams: SearchParams) => {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) {
      urlSearchParams.append(key, value.toString());
    }
  }
  return urlSearchParams;
};

export const toUrl = (host: string, searchParams?: SearchParams) => {
  const search = searchParams
    ? toUrlSearchParams(searchParams).toString()
    : undefined;
  return `${host}${search ? `?${search}` : ""}`;
};

// This function will validate search params using Zod
export const checkRequests = <T extends z.ZodRawShape>(
  searchParams: URLSearchParams | SearchParams,
  schema: z.ZodObject<T>
) => {
  if (searchParams instanceof URLSearchParams) {
    searchParams = convertToSearchParams(searchParams);
  }
  return schema.safeParse(searchParams);
};


export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function getPerformanceColor(performance: number): string {
  if (performance >= 85) return "bg-green-500";
  if (performance >= 70) return "bg-yellow-500";
  return "bg-red-500";
}