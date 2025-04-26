import { lessonPlanSelectSchema } from "@/validations/select";
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



type FilterFormControl = ReturnType<typeof useForm<z.infer<typeof lessonPlanSelectSchema>>>;

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
): ColumnDef<z.infer<typeof lessonPlanSelectSchema>>[] => [
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.original.title}</div>,
  },

  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => <div>{row.original.subject}</div>,
  },

  {
    accessorKey: "gradeLevel",
    header: "GradeLevel",
    cell: ({ row }) => <div>{row.original.gradeLevel}</div>,
  },

  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <div>{row.original.duration}</div>,
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.original.date}</div>,
  },

  {
    accessorKey: "classId",
    header: "ClassId",
    cell: ({ row }) => <div>{row.original.classId}</div>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.status}</div>,
  },

  {
    accessorKey: "objectives",
    header: "Objectives",
    cell: ({ row }) => <div>{row.original.objectives}</div>,
  },

  {
    accessorKey: "materials",
    header: "Materials",
    cell: ({ row }) => <div>{row.original.materials}</div>,
  },

  {
    accessorKey: "introduction",
    header: "Introduction",
    cell: ({ row }) => <div>{row.original.introduction}</div>,
  },

  {
    accessorKey: "mainActivity",
    header: "MainActivity",
    cell: ({ row }) => <div>{row.original.mainActivity}</div>,
  },

  {
    accessorKey: "conclusion",
    header: "Conclusion",
    cell: ({ row }) => <div>{row.original.conclusion}</div>,
  },

  {
    accessorKey: "assessment",
    header: "Assessment",
    cell: ({ row }) => <div>{row.original.assessment}</div>,
  },

  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => <div>{row.original.notes}</div>,
  },

  {
    accessorKey: "userId",
    header: "userId",
    cell: ({ row }) => <div>{row.original.userId}</div>,
  },

  {
    accessorKey: "organizationId",
    header: "OrganizationId",
    cell: ({ row }) => <div>{row.original.organizationId}</div>,
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
    accessorKey: "procedure",
    header: "Procedure",
    cell: ({ row }) => <div>{row.original.procedure}</div>,
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