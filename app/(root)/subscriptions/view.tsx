"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid, List, Plus } from "lucide-react";
import { Subscriptions } from "@/types/entities";
import { SubscriptionsClass } from "@/classes/subscriptions";
import { useForm } from "react-hook-form";
import { subscriptionSelectSchema } from "@/validations/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { columns } from "@/components/custom/subscriptions/columns";
import Link from "next/link";

export default function SubscriptionsView({ data }: { data: Subscriptions[] }) {
  const [viewMode, setViewMode] = useState("card");

  const formSchema = useForm({
    resolver: zodResolver(subscriptionSelectSchema)
  });

  const handleViewModeChange = (mode: "card" | "table") => {
    setViewMode(mode);
  };

  const SubscriptionInstance = new SubscriptionsClass(data);

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <Link href="./subscriptions/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Subscription
            </Button>
          </Link>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "card" ? "default" : "outline"}
            onClick={() => handleViewModeChange("card")}
            aria-label="Card view"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            onClick={() => handleViewModeChange("table")}
            aria-label="Table view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-lg border border-dashed">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Subscriptions Found</h3>
          <p className="text-sm text-gray-500 mb-4">
            Get started by creating your first subscription.
          </p>
          <Link href="./subscriptions/create">
            <Button>
              Create Subscription
            </Button>
          </Link>
        </div>
      ) : viewMode === "card" ? (
        <SubscriptionInstance.Cards />
      ) : (
        <SubscriptionInstance.Table data={data} columns={columns(formSchema)} />
      )}
    </>
  );
}
  