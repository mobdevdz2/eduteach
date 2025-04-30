import { Suspense } from "react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DashboardContent } from "@/components/custom/dashboard/dashboard-content"
import { Skeleton } from "@/components/ui/skeleton"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session.user.name}</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent  />
      </Suspense>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="p-4 space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="p-4 space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
