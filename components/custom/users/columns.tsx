import { userSelectSchema } from "@/validations/select";
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



type FilterFormControl = ReturnType<typeof useForm<z.infer<typeof userSelectSchema>>>;

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
): ColumnDef<z.infer<typeof userSelectSchema>>[] => [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },

  {
    accessorKey: "emailVerified",
    header: "EmailVerified",
    cell: ({ row }) => <div>{row.original.emailVerified}</div>,
  },

  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => <div>{row.original.image}</div>,
  },

  {
    accessorKey: "firstName",
    header: "FirstName",
    cell: ({ row }) => <div>{row.original.firstName}</div>,
  },

  {
    accessorKey: "lastName",
    header: "LastName",
    cell: ({ row }) => <div>{row.original.lastName}</div>,
  },

  {
    accessorKey: "passwordHash",
    header: "PasswordHash",
    cell: ({ row }) => <div>{row.original.passwordHash}</div>,
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.original.role}</div>,
  },

  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => <div>{row.original.createdAt}</div>,
  },

  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
    cell: ({ row }) => <div>{row.original.updatedAt}</div>,
  },

  {
    accessorKey: "stripeCustomerId",
    header: "StripeCustomerId",
    cell: ({ row }) => <div>{row.original.stripeCustomerId}</div>,
  },

  {
    accessorKey: "organizationId",
    header: "OrganizationId",
    cell: ({ row }) => <div>{row.original.organizationId}</div>,
  },

  {
    accessorKey: "lastLoginAt",
    header: "LastLoginAt",
    cell: ({ row }) => <div>{row.original.lastLoginAt}</div>,
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