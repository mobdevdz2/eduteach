"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid, List, Plus } from "lucide-react";
import { VerificationTokens } from "@/types/entities";
import { VerificationTokensClass } from "@/classes/verificationtokens";
import { useForm } from "react-hook-form";
import { verificationtokenSelectSchema } from "@/validations/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { columns } from "@/components/custom/verificationtokens/columns";
import Link from "next/link";

export default function VerificationTokensView({ data }: { data: VerificationTokens[] }) {
  const [viewMode, setViewMode] = useState("card");

  const formSchema = useForm({
    resolver: zodResolver(verificationtokenSelectSchema)
  });

  const handleViewModeChange = (mode: "card" | "table") => {
    setViewMode(mode);
  };

  const VerificationTokenInstance = new VerificationTokensClass(data);

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <Link href="./verificationtokens/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create VerificationToken
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
          <h3 className="text-lg font-medium mb-2">No VerificationTokens Found</h3>
          <p className="text-sm text-gray-500 mb-4">
            Get started by creating your first verificationtoken.
          </p>
          <Link href="./verificationtokens/create">
            <Button>
              Create VerificationToken
            </Button>
          </Link>
        </div>
      ) : viewMode === "card" ? (
        <VerificationTokenInstance.Cards />
      ) : (
        <VerificationTokenInstance.Table data={data} columns={columns(formSchema)} />
      )}
    </>
  );
}
  