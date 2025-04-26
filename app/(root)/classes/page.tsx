import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { serverService } from "@/lib/server";
import { SiteHeader } from "@/components/shared/site-header";
import ClassesView from "./view";

async function getClassesData() {
  return await serverService.classes.findMany({});
}

export default async function ClassesPage() {
  const data = await getClassesData();

  return (
    <>
      <SiteHeader title="Classes" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4 max-w-screen overflow-x-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Classes Management</h1>
            <p className="text-sm text-muted-foreground">Manage your classes data</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <ClassesView data={data} />
        </Suspense>
      </div>
    </>
  );
}
