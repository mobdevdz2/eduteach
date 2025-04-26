import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { serverService } from "@/lib/server";
import { SiteHeader } from "@/components/shared/site-header";
import SessionsView from "./view";

async function getSessionsData() {
  return await serverService.sessions.findMany({});
}

export default async function SessionsPage() {
  const data = await getSessionsData();

  return (
    <>
      <SiteHeader title="Sessions" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4 max-w-screen overflow-x-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Sessions Management</h1>
            <p className="text-sm text-muted-foreground">Manage your sessions data</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <SessionsView data={data} />
        </Suspense>
      </div>
    </>
  );
}
