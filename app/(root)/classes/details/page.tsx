import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Classes } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { ClassesDetail } from "@/components/custom/classes/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getClassesById(id: string) {
  return await serverService.classes.findUnique({ where: { id } });
}

export default async function ClassesDetailPage({ params }: { params: { id: string } }) {
  const data = await getClassesById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Classes Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Classes Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this classes</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <ClassesDetail classes={data} />
        </Suspense>
      </div>
    </>
  );
}
