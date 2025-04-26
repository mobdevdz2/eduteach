import { accountSelectSchema } from "@/validations/select";
import { ColumnDef } from "@tanstack/react-table";
import {
  GripVerticalIcon,
  MoreVerticalIcon
} from "lucide-react";
import { z } from "zod";
import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui";
import { useSortable } from "@dnd-kit/sortable";
import { useForm } from "react-hook-form";



type FilterFormControl = ReturnType<typeof useForm<z.infer<typeof accountSelectSchema>>>;

function DragHandle({
  id,
  filterForm,
}: {
  id: number;
  filterForm: FilterFormControl;
}) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}



export const columns = (
  filterForm: FilterFormControl
): ColumnDef<z.infer<typeof accountSelectSchema>>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.index} filterForm={filterForm} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },

  {
    accessorKey: "userId",
    header: "UserId",
    cell: ({ row }) => <div>{row.original.userId}</div>,
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.original.type}</div>,
  },

  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => <div>{row.original.provider}</div>,
  },

  {
    accessorKey: "providerAccountId",
    header: "ProviderAccountId",
    cell: ({ row }) => <div>{row.original.providerAccountId}</div>,
  },

  {
    accessorKey: "refresh_token",
    header: "Refresh_token",
    cell: ({ row }) => <div>{row.original.refresh_token}</div>,
  },

  {
    accessorKey: "access_token",
    header: "Access_token",
    cell: ({ row }) => <div>{row.original.access_token}</div>,
  },

  {
    accessorKey: "expires_at",
    header: "Expires_at",
    cell: ({ row }) => <div>{row.original.expires_at}</div>,
  },

  {
    accessorKey: "token_type",
    header: "Token_type",
    cell: ({ row }) => <div>{row.original.token_type}</div>,
  },

  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => <div>{row.original.scope}</div>,
  },

  {
    accessorKey: "id_token",
    header: "Id_token",
    cell: ({ row }) => <div>{row.original.id_token}</div>,
  },

  {
    accessorKey: "session_state",
    header: "Session_state",
    cell: ({ row }) => <div>{row.original.session_state}</div>,
  },

  {
    accessorKey: "oauth_token_secret",
    header: "Oauth_token_secret",
    cell: ({ row }) => <div>{row.original.oauth_token_secret}</div>,
  },

  {
    accessorKey: "oauth_token",
    header: "Oauth_token",
    cell: ({ row }) => <div>{row.original.oauth_token}</div>,
  },

  {
    accessorKey: "enableRLS",
    header: "EnableRLS",
    cell: ({ row }) => <div>{row.original.enableRLS}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted">
            <MoreVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];