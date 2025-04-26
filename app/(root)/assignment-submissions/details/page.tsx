import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { AssignmentSubmissions } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { AssignmentSubmissionsDetail } from "@/components/custom/assignmentsubmissions/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getAssignmentSubmissionsById(id: string) {
  return await serverService.assignmentsubmissions.findUnique({ where: { id } });
}

export default async function AssignmentSubmissionsDetailPage({ params }: { params: { id: string } }) {
  const data = await getAssignmentSubmissionsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="AssignmentSubmissions Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AssignmentSubmissions Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this assignmentsubmissions</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <AssignmentSubmissionsDetail assignmentsubmissions={data} />
        </Suspense>
      </div>
    </>
  );
}
