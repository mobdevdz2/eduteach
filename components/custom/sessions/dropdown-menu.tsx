// @/components/custom/sessions/dropdown-menu.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sessions } from "@/types/entities";
import React from "react";

interface Props {
  row: { original: Sessions };
  actions: {
    edit?: (data: Sessions) => void;
    details?: (data: Sessions) => void;
    duplicate?: (data: Sessions) => void;
    delete?: (data: Sessions) => void;
  };
}

export function SessionsDropdownMenu({ row, actions }: Props) {
  const {
    edit,
    details,
    duplicate,
    delete: handleDeleteAction
  } = actions;

  const handleEdit = edit ?? (() => {});
  const handleDetails = details ?? (() => {});
  const handleDuplicate = duplicate ?? (() => {});
  const handleDelete = handleDeleteAction ?? (() => {});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        
        <DropdownMenuItem onClick={() => handleEdit(row.original)}>
          Edit
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleDetails(row.original)}>
          Details
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleDuplicate(row.original)}>
          Duplicate
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleDelete(row.original)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
