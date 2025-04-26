import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Students } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { StudentsDetail } from "@/components/custom/students/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getStudentsById(id: string) {
  return await serverService.students.findUnique({ where: { id } });
}

export default async function StudentsDetailPage({ params }: { params: { id: string } }) {
  const data = await getStudentsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Students Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Students Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this students</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <StudentsDetail students={data} />
        </Suspense>
      </div>
    </>
  );
}
