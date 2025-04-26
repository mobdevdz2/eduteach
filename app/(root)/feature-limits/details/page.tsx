import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { FeatureLimits } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { FeatureLimitsDetail } from "@/components/custom/featurelimits/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getFeatureLimitsById(id: string) {
  return await serverService.featurelimits.findUnique({ where: { id } });
}

export default async function FeatureLimitsDetailPage({ params }: { params: { id: string } }) {
  const data = await getFeatureLimitsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="FeatureLimits Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">FeatureLimits Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this featurelimits</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <FeatureLimitsDetail featurelimits={data} />
        </Suspense>
      </div>
    </>
  );
}
