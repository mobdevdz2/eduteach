import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { Accounts } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { AccountsDetail } from "@/components/custom/accounts/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getAccountsById(id: string) {
  return await serverService.accounts.findUnique({ where: { id } });
}

export default async function AccountsDetailPage({ params }: { params: { id: string } }) {
  const data = await getAccountsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Accounts Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Accounts Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this accounts</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <AccountsDetail accounts={data} />
        </Suspense>
      </div>
    </>
  );
}
