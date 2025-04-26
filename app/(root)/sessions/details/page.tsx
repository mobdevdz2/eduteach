import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Sessions } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { SessionsDetail } from "@/components/custom/sessions/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getSessionsById(id: string) {
  return await serverService.sessions.findUnique({ where: { id } });
}

export default async function SessionsDetailPage({ params }: { params: { id: string } }) {
  const data = await getSessionsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Sessions Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Sessions Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this sessions</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <SessionsDetail sessions={data} />
        </Suspense>
      </div>
    </>
  );
}
