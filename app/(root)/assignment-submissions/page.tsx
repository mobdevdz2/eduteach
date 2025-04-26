import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { serverService } from "@/lib/server";
import { SiteHeader } from "@/components/shared/site-header";
import AssignmentSubmissionsView from "./view";

async function getAssignmentSubmissionsData() {
  return await serverService.assignmentSubmissions.findMany({});
}

export default async function AssignmentSubmissionsPage() {
  const data = await getAssignmentSubmissionsData();

  return (
    <>
      <SiteHeader title="AssignmentSubmissions" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4 max-w-screen overflow-x-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AssignmentSubmissions Management</h1>
            <p className="text-sm text-muted-foreground">Manage your assignmentsubmissions data</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <AssignmentSubmissionsView data={data} />
        </Suspense>
      </div>
    </>
  );
}
