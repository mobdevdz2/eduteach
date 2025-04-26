import { notFound } from "next/navigation";
import { serverService } from "@/lib/server";
import { CalendarEvents } from "@/types/entities";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { CalendarEventsDetail } from "@/components/custom/calendarevents/detail";
import { SiteHeader } from "@/components/shared/site-header";

async function getCalendarEventsById(id: string) {
  return await serverService.calendarevents.findUnique({ where: { id } });
}

export default async function CalendarEventsDetailPage({ params }: { params: { id: string } }) {
  const data = await getCalendarEventsById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="CalendarEvents Details" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">CalendarEvents Details</h1>
            <p className="text-sm text-muted-foreground">View detailed information about this calendarevents</p>
          </div>
        </div>
        
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <CalendarEventsDetail calendarevents={data} />
        </Suspense>
      </div>
    </>
  );
}
