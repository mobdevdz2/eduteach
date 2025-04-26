import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { VerificationTokens } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { VerificationTokensDetail } from "@/components/custom/verificationtokens/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getVerificationTokensById(id: string) {
  return await serverService.verificationtokens.findUnique({ where: { id } });
}

export default async function VerificationTokensDetailPage({ params }: { params: { id: string } }) {
  const data = await getVerificationTokensById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="VerificationTokens Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">VerificationTokens Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this verificationtokens</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <VerificationTokensDetail verificationtokens={data} />
        </Suspense>
      </div>
    </>
  );
}
