import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Organizations } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { OrganizationsDetail } from "@/components/custom/organizations/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getOrganizationsById(id: string) {
  return await serverService.organizations.findUnique({ where: { id } });
}

export default async function OrganizationsDetailPage({ params }: { params: { id: string } }) {
  const data = await getOrganizationsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Organizations Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Organizations Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this organizations</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <OrganizationsDetail organizations={data} />
        </Suspense>
      </div>
    </>
  );
}
