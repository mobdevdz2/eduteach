import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Assignments } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { AssignmentsDetail } from "@/components/custom/assignments/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getAssignmentsById(id: string) {
  return await serverService.assignments.findUnique({ where: { id } });
}

export default async function AssignmentsDetailPage({ params }: { params: { id: string } }) {
  const data = await getAssignmentsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Assignments Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Assignments Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this assignments</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <AssignmentsDetail assignments={data} />
        </Suspense>
      </div>
    </>
  );
}
