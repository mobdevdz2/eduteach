// components/calendar/EventForm.tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Trash2 } from "lucide-react"
import { CalendarEvents } from "@/types/entities"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { getEventColor } from "@/lib/calendar-utils"
import { calendarEventInsertSchema } from "@/validations/insert"
import { z } from "zod"

interface EventFormProps {
  defaultValues: Partial<CalendarEvents>
  onSubmit: (values: EventFormValues) => void
  isEdit: boolean
  onDelete: () => void
  onCancel: () => void
}

export function EventForm({ 
  defaultValues, 
  onSubmit, 
  isEdit, 
  onDelete, 
  onCancel 
}: EventFormProps) {
  const form = useForm<z.infer<typeof calendarEventInsertSchema>>({
    resolver: zodResolver(calendarEventInsertSchema),
    defaultValues: defaultValues},)

  function handleUpdateDate(field: any, date: Date | undefined, timeStr?: string) {
    if (!date) return
    
    let updatedDate = new Date(date)
    
    if (timeStr) {
      const [hours, minutes] = timeStr.split(":").map(Number)
      updatedDate.setHours(hours)
      updatedDate.setMinutes(minutes)
    }
    
    field.onChange(updatedDate.toISOString())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit,console.error)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? 
                          format(new Date(field.value), "PPP") : 
                          <span>Pick a date</span>
                        }
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => handleUpdateDate(
                        field, 
                        date, 
                        field.value ? format(new Date(field.value), "HH:mm") : undefined
                      )}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormControl>
                  <Input
                    type="time"
                    value={field.value ? format(new Date(field.value), "HH:mm") : ""}
                    onChange={(e) => handleUpdateDate(
                      field, 
                      field.value ? new Date(field.value) : new Date(), 
                      e.target.value
                    )}
                    className="mt-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? 
                          format(new Date(field.value), "PPP") : 
                          <span>Pick a date</span>
                        }
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => handleUpdateDate(
                        field, 
                        date, 
                        field.value ? format(new Date(field.value), "HH:mm") : undefined
                      )}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormControl>
                  <Input
                    type="time"
                    value={field.value ? format(new Date(field.value), "HH:mm") : ""}
                    onChange={(e) => handleUpdateDate(
                      field, 
                      field.value ? new Date(field.value) : new Date(), 
                      e.target.value
                    )}
                    className="mt-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select 
                value={field.value} 
                onValueChange={(value) => {
                  field.onChange(value)
                  // Also update color based on type
                  form.setValue("color", getEventColor(value))
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Event location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Event description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          {isEdit && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}