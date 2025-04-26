import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Grades } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { GradesDetail } from "@/components/custom/grades/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getGradesById(id: string) {
  return await serverService.grades.findUnique({ where: { id } });
}

export default async function GradesDetailPage({ params }: { params: { id: string } }) {
  const data = await getGradesById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Grades Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Grades Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this grades</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <GradesDetail grades={data} />
        </Suspense>
      </div>
    </>
  );
}
