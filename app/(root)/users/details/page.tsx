import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Users } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { UsersDetail } from "@/components/custom/users/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getUsersById(id: string) {
  return await serverService.users.findUnique({ where: { id } });
}

export default async function UsersDetailPage({ params }: { params: { id: string } }) {
  const data = await getUsersById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Users Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Users Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this users</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <UsersDetail users={data} />
        </Suspense>
      </div>
    </>
  );
}
