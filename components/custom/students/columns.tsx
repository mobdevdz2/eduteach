import { studentSelectSchema } from "@/validations/select";
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



type FilterFormControl = ReturnType<typeof useForm<z.infer<typeof studentSelectSchema>>>;

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
): ColumnDef<z.infer<typeof studentSelectSchema>>[] => [
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },

  {
    accessorKey: "dateOfBirth",
    header: "DateOfBirth",
    cell: ({ row }) => <div>{row.original.dateOfBirth}</div>,
  },

  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.original.gender}</div>,
  },

  {
    accessorKey: "enrollmentDate",
    header: "EnrollmentDate",
    cell: ({ row }) => <div>{row.original.enrollmentDate}</div>,
  },

  {
    accessorKey: "previousSchool",
    header: "PreviousSchool",
    cell: ({ row }) => <div>{row.original.previousSchool}</div>,
  },

  {
    accessorKey: "specialNeeds",
    header: "SpecialNeeds",
    cell: ({ row }) => <div>{row.original.specialNeeds}</div>,
  },

  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => <div>{row.original.notes}</div>,
  },

  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.original.address}</div>,
  },

  {
    accessorKey: "emergencyContact",
    header: "EmergencyContact",
    cell: ({ row }) => <div>{row.original.emergencyContact}</div>,
  },

  {
    accessorKey: "emergencyPhone",
    header: "EmergencyPhone",
    cell: ({ row }) => <div>{row.original.emergencyPhone}</div>,
  },

  {
    accessorKey: "relationship",
    header: "Relationship",
    cell: ({ row }) => <div>{row.original.relationship}</div>,
  },



  {
    accessorKey: "organizationId",
    header: "OrganizationId",
    cell: ({ row }) => <div>{row.original.organizationId}</div>,
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