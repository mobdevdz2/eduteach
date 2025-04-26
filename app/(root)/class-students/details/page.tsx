import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { ClassStudents } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { ClassStudentsDetail } from "@/components/custom/classstudents/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getClassStudentsById(id: string) {
  return await serverService.classstudents.findUnique({ where: { id } });
}

export default async function ClassStudentsDetailPage({ params }: { params: { id: string } }) {
  const data = await getClassStudentsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="ClassStudents Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">ClassStudents Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this classstudents</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <ClassStudentsDetail classstudents={data} />
        </Suspense>
      </div>
    </>
  );
}
