import { featureLimitSelectSchema } from "@/validations/select";
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



type FilterFormControl = ReturnType<typeof useForm<z.infer<typeof featureLimitSelectSchema>>>;

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
): ColumnDef<z.infer<typeof featureLimitSelectSchema>>[] => [
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
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <div>{row.original.plan}</div>,
  },

  {
    accessorKey: "maxClasses",
    header: "MaxClasses",
    cell: ({ row }) => <div>{row.original.maxClasses}</div>,
  },

  {
    accessorKey: "maxStudentsPerClass",
    header: "MaxStudentsPerClass",
    cell: ({ row }) => <div>{row.original.maxStudentsPerClass}</div>,
  },

  {
    accessorKey: "maxStorageGB",
    header: "MaxStorageGB",
    cell: ({ row }) => <div>{row.original.maxStorageGB}</div>,
  },

  {
    accessorKey: "advancedGrading",
    header: "AdvancedGrading",
    cell: ({ row }) => <div>{row.original.advancedGrading}</div>,
  },

  {
    accessorKey: "lessonPlanning",
    header: "LessonPlanning",
    cell: ({ row }) => <div>{row.original.lessonPlanning}</div>,
  },

  {
    accessorKey: "studentAnalytics",
    header: "StudentAnalytics",
    cell: ({ row }) => <div>{row.original.studentAnalytics}</div>,
  },

  {
    accessorKey: "parentCommunication",
    header: "ParentCommunication",
    cell: ({ row }) => <div>{row.original.parentCommunication}</div>,
  },

  {
    accessorKey: "adminDashboard",
    header: "AdminDashboard",
    cell: ({ row }) => <div>{row.original.adminDashboard}</div>,
  },

  {
    accessorKey: "departmentAnalytics",
    header: "DepartmentAnalytics",
    cell: ({ row }) => <div>{row.original.departmentAnalytics}</div>,
  },

  {
    accessorKey: "customIntegrations",
    header: "CustomIntegrations",
    cell: ({ row }) => <div>{row.original.customIntegrations}</div>,
  },

  {
    accessorKey: "prioritySupport",
    header: "PrioritySupport",
    cell: ({ row }) => <div>{row.original.prioritySupport}</div>,
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