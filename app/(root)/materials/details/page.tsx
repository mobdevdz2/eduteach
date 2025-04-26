import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Materials } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { MaterialsDetail } from "@/components/custom/materials/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getMaterialsById(id: string) {
  return await serverService.materials.findUnique({ where: { id } });
}

export default async function MaterialsDetailPage({ params }: { params: { id: string } }) {
  const data = await getMaterialsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Materials Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Materials Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this materials</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <MaterialsDetail materials={data} />
        </Suspense>
      </div>
    </>
  );
}
