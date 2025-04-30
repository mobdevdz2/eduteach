// DayPilotCalendarView.tsx - Main Component
"use client"

import { useState, useRef, useEffect } from "react"
import { DayPilot } from "@daypilot/daypilot-lite-react"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

import { CalendarNavigator } from "@/components/custom/calendarEvents/CalendarNavigator"
import { CalendarDayView } from "@/components/custom/calendarEvents/CalendarDayView"
import { CalendarWeekView } from "@/components/custom/calendarEvents/CalendarWeekView"
import { CalendarMonthView } from "@/components/custom/calendarEvents/CalendarMonthView"
import { CalendarResourcesView } from "@/components/custom/calendarEvents/CalendarResourcesView"
import { EventDialog } from "@/components/custom/calendarEvents/EventDialog"
import { DeleteConfirmDialog } from "@/components/custom/calendarEvents/DeleteConfirmDialog"
import { CalendarEvents } from "@/types/entities"

import {
  useGetCalendarEvents,
  useCreateCalendarEvents,
  useUpdateCalendarEvents,
  useDeleteCalendarEvents,
} from "@/services/calendarEvents-service"
import { getEventColor } from "@/lib/calendar-utils"
import { Day } from "react-day-picker"

export default function DayPilotCalendarView() {
  const [view, setView] = useState<"day" | "week" | "month" | "resources">("week")
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvents[]>([])
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvents | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvents>>({
    text: "",
    start: new DayPilot.Date(),
    end: new DayPilot.Date(),
    color: "#3174ad",
    type: "class",
    location: "",
    description: "",
  })

  const calendarRef = useRef<{ control: DayPilot.Calendar } | null>(null)
  const monthRef = useRef<{ control: DayPilot.Month } | null>(null)

  const { mutate: fetchEvents, isPending: isLoading } = useGetCalendarEvents()
  const { mutate: createEvent } = useCreateCalendarEvents()
  const { mutate: updateEvent } = useUpdateCalendarEvents()
  const { mutate: deleteEvent } = useDeleteCalendarEvents()

  // Load events when component mounts
  useEffect(() => {
    loadEvents()
  }, [])

  // Update calendar when date or view changes
  useEffect(() => {
    if (calendarRef.current?.control) {
      calendarRef.current.control.update({
        startDate: new DayPilot.Date(date.toISOString()),
      })
    }
    if (monthRef.current?.control) {
      monthRef.current.control.update({
        startDate: new DayPilot.Date(date.toISOString()),
      })
    }
  }, [date, view])

  function loadEvents() {
    fetchEvents(
      {},
      {
        onSuccess: (data) => {
          // Transform the data to match DayPilot event format
          const formattedEvents = data?.map((event: any) => ({
            ...event,
            color: getEventColor(event.type),

          }))
          setEvents(formattedEvents)
        },
      },
    )
  }

  function handleEventClick(args: any) {
    const event = args.e.data
    setSelectedEvent(event)
    setNewEvent(event)
    console.log({event})
    setIsEventDialogOpen(true)
  }

  function handleTimeRangeSelected(args: any) {
    const startDate = args.start
    const endDate = args.end

    setSelectedEvent(null)
    setNewEvent({
      text: "",
      start: startDate,
      end: endDate,
      color: "#3174ad",
      type: "class",
      location: "",
      description: "",
    })
    setIsEventDialogOpen(true)
  }

  function handleBeforeEventRender(args: any) {
    const event = args.data
    args.data.backColor = event.color || getEventColor(event.type)

    if (event.type) {
      args.data.html = `
        <div>
          <div style="font-weight: bold">${event.text}</div>
          <div>${event.type}</div>
          ${event.location ? `<div>${event.location}</div>` : ""}
        </div>
      `
    }
  }

  function handleSaveEvent(formData: any) {
    if (selectedEvent) {
      // Update existing event
      updateEvent(
        {
          id: selectedEvent.id,
          data: { ...formData },
        }


      )
    } else {
      // Create new event
      createEvent(
        formData,
        {
          onSuccess: () => {
            loadEvents()
            setIsEventDialogOpen(false)
            toast.success("Event created successfully")
          },
        },
      )
    }
  }

  function handleDeleteEvent() {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id, {
        onSuccess: () => {
          loadEvents()
          setIsDeleteDialogOpen(false)
          setIsEventDialogOpen(false)
          toast.success("Event deleted successfully")
        },
      })
    }
  }

  function handleNavigatorChange(newDate: DayPilot.Date) {
    setDate(newDate.toDate())
  }

  function handleAddNewEvent() {
    setSelectedEvent(null)
    setNewEvent({
      text: "",
      start: new DayPilot.Date(),
      end: new DayPilot.Date((new DayPilot.Date()).addHours(1)),
      color: "#3174ad",
      type: "class",
      location: "",
      description: "",
    })
    setIsEventDialogOpen(true)
  }

  const calendarProps = {
    events,
    date: new DayPilot.Date(date.toISOString()),
    calendarRef,
    handleEventClick,
    handleTimeRangeSelected,
    handleBeforeEventRender,
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Card className="md:w-64">
          <CalendarNavigator
            date={new DayPilot.Date(date.toISOString())}
            onDateChange={handleNavigatorChange}
            onAddEvent={handleAddNewEvent}
          />
        </Card>

        <div className="flex-1">
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(date);
                    if (view === "day") {
                      newDate.setDate(date.getDate() - 1);
                    } else if (view === "week") {
                      newDate.setDate(date.getDate() - 7);
                    } else {
                      newDate.setMonth(date.getMonth() - 1);
                    }
                    setDate(newDate);
                  }}
                >
                  Previous
                </Button>

                <div className="text-lg font-semibold min-w-40 text-center">
                  {date instanceof Date && !isNaN(date.getTime())
                    ? format(date, view === "month" ? "MMMM yyyy" : "MMM d, yyyy")
                    : "Invalid date"}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(date);
                    if (view === "day") {
                      newDate.setDate(date.getDate() + 1);
                    } else if (view === "week") {
                      newDate.setDate(date.getDate() + 7);
                    } else {
                      newDate.setMonth(date.getMonth() + 1);
                    }
                    setDate(newDate);
                  }}
                >
                  Next
                </Button>
              </div>

              <Button
                variant="default"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleAddNewEvent}
              >
                <Plus size={16} />
                <span>New Event</span>
              </Button>
            </div>

            <TabsContent value="day" className="mt-0">
              <CalendarDayView {...calendarProps} />
            </TabsContent>

            <TabsContent value="week" className="mt-0">
              <CalendarWeekView {...calendarProps} />
            </TabsContent>

            <TabsContent value="month" className="mt-0">
              <CalendarMonthView {...calendarProps} monthRef={monthRef} />
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              <CalendarResourcesView {...calendarProps} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <EventDialog
        isOpen={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        event={newEvent}
        isEdit={!!selectedEvent}
        onSave={handleSaveEvent}
        onDelete={() => setIsDeleteDialogOpen(true)}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteEvent}
      />
    </div>
  )
}