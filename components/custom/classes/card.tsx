"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Classes } from "@/db/schema";

export function ClassesCard({ data }: { data: Classes }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{data.id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        {/* Replace with actual fields */}
        <div><strong>ID:</strong> {data.id}</div>
        <div><strong>Created at:</strong> {String(data.createdAt || "N/A")}</div>
      </CardContent>
    </Card>
  );
}
