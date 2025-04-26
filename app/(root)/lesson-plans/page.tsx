import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { serverService } from "@/lib/server";
import { SiteHeader } from "@/components/shared/site-header";
import LessonPlansView from "./view";

async function getLessonPlansData() {
  return await serverService.lessonPlans.findMany({});
}

export default async function LessonPlansPage() {
  const data = await getLessonPlansData();

  return (
    <>
      <SiteHeader title="LessonPlans" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4 max-w-screen overflow-x-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">LessonPlans Management</h1>
            <p className="text-sm text-muted-foreground">Manage your lessonplans data</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <LessonPlansView data={data} />
        </Suspense>
      </div>
    </>
  );
}
