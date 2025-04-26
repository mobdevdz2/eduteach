import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Subscriptions } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { SubscriptionsDetail } from "@/components/custom/subscriptions/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getSubscriptionsById(id: string) {
  return await serverService.subscriptions.findUnique({ where: { id } });
}

export default async function SubscriptionsDetailPage({ params }: { params: { id: string } }) {
  const data = await getSubscriptionsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Subscriptions Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Subscriptions Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this subscriptions</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <SubscriptionsDetail subscriptions={data} />
        </Suspense>
      </div>
    </>
  );
}
