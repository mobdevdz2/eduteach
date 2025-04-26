import { calendarEventSelectSchema } from "@/validations/select";
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



type FilterFormControl = ReturnType<typeof useForm<z.infer<typeof calendarEventSelectSchema>>>;

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
): ColumnDef<z.infer<typeof calendarEventSelectSchema>>[] => [
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description?.toString()}</div>,
  },

  {
    accessorKey: "startDate",
    header: "StartDate",
    cell: ({ row }) => <div>{row.original.startDate?.toString()}</div>,
  },

  {
    accessorKey: "endDate",
    header: "EndDate",
    cell: ({ row }) => <div>{row.original.endDate?.toString()}</div>,
  },

  {
    accessorKey: "allDay",
    header: "AllDay",
    cell: ({ row }) => <div>{row.original.allDay}</div>,
  },

  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.original.location}</div>,
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.original.type}</div>,
  },

  {
    accessorKey: "classId",
    header: "ClassId",
    cell: ({ row }) => <div>{row.original.classId}</div>,
  },

  {
    accessorKey: "assignmentId",
    header: "AssignmentId",
    cell: ({ row }) => <div>{row.original.assignmentId}</div>,
  },

  {
    accessorKey: "lessonPlanId",
    header: "LessonPlanId",
    cell: ({ row }) => <div>{row.original.lessonPlanId?.toString()}</div>,
  },

  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => <div>{row.original.color?.toString()}</div>,
  },

  {
    accessorKey: "userId",
    header: "userId",
    cell: ({ row }) => <div>{row.original.userId?.toString()}</div>,
  },

  {
    accessorKey: "recurrenceRule",
    header: "RecurrenceRule",
    cell: ({ row }) => <div>{row.original.recurrenceRule?.toString()}</div>,
  },

  {
    accessorKey: "isRecurring",
    header: "IsRecurring",
    cell: ({ row }) => <div>{row.original.isRecurring?.toString()}</div>,
  },

  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => <div>{row.original.visibility?.toString()}</div>,
  },

  {
    accessorKey: "reminders",
    header: "Reminders",
    cell: ({ row }) => <div>{row.original.reminders?.toString()}</div>,
  },

  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => <div>{row.original.createdAt?.toString()}</div>,
  },

  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
    cell: ({ row }) => <div>{row.original.updatedAt?.toString()}</div>,
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