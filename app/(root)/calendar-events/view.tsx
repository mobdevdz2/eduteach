"use client"

import { useState, useRef, useEffect } from "react"
import { type DayPilot, DayPilotCalendar, DayPilotNavigator, DayPilotMonth } from "@daypilot/daypilot-lite-react"
import {
  useGetCalendarEvents,
  useCreateCalendarEvents,
  useUpdateCalendarEvents,
  useDeleteCalendarEvents,
} from "@/services/calendarEvents-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface CalendarEvent {
  id: string
  text: string
  start: string
  end: string
  color?: string
  resource?: string
  type?: string
  location?: string
  description?: string
}

export default function DayPilotCalendarView() {
  const [view, setView] = useState<"day" | "week" | "month" | "resources">("week")
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    text: "",
    start: "",
    end: "",
    color: "#3174ad",
    type: "class",
    location: "",
    description: "",
  })

  const calendarRef = useRef<{ control: DayPilot.Calendar } | null>(null)
  const monthRef = useRef<{ control: DayPilot.Month } | null>(null)

  const { mutate: fetchEvents, isLoading } = useGetCalendarEvents()
  const { mutate: createEvent } = useCreateCalendarEvents()
  const { mutate: updateEvent } = useUpdateCalendarEvents()
  const { mutate: deleteEvent } = useDeleteCalendarEvents()

  // Config for different calendar views
  const dayConfig = {
    viewType: "Day",
    headerDateFormat: "dddd, MMMM d, yyyy",
    cellDuration: 30,
    businessBeginsHour: 8,
    businessEndsHour: 18,
    heightSpec: "BusinessHours",
    eventDeleteHandling: "Update",
    onEventClick: handleEventClick,
    onTimeRangeSelected: handleTimeRangeSelected,
    onBeforeEventRender: handleBeforeEventRender,
  }

  const weekConfig = {
    viewType: "Week",
    headerDateFormat: "dddd, MMMM d, yyyy",
    cellDuration: 30,
    businessBeginsHour: 8,
    businessEndsHour: 18,
    heightSpec: "BusinessHours",
    eventDeleteHandling: "Update",
    onEventClick: handleEventClick,
    onTimeRangeSelected: handleTimeRangeSelected,
    onBeforeEventRender: handleBeforeEventRender,
  }

  const monthConfig = {
    cellHeight: 60,
    eventDeleteHandling: "Update",
    onEventClick: handleEventClick,
    onTimeRangeSelected: handleTimeRangeSelected,
    onBeforeEventRender: handleBeforeEventRender,
  }

  const resourcesConfig = {
    viewType: "Resources",
    resources: [
      { name: "Room A", id: "A" },
      { name: "Room B", id: "B" },
      { name: "Room C", id: "C" },
    ],
    headerDateFormat: "dddd, MMMM d, yyyy",
    cellDuration: 30,
    businessBeginsHour: 8,
    businessEndsHour: 18,
    heightSpec: "BusinessHours",
    eventDeleteHandling: "Update",
    onEventClick: handleEventClick,
    onTimeRangeSelected: handleTimeRangeSelected,
    onBeforeEventRender: handleBeforeEventRender,
  }

  // Load events when component mounts
  useEffect(() => {
    loadEvents()
  }, [])

  // Update calendar when date or view changes
  useEffect(() => {
    if (calendarRef.current?.control) {
      calendarRef.current.control.update({
        startDate: date,
      })
    }
    if (monthRef.current?.control) {
      monthRef.current.control.update({
        startDate: date,
      })
    }
  }, [date, view])

  function loadEvents() {
    fetchEvents(
      {},
      {
        onSuccess: (data) => {
          // Transform the data to match DayPilot event format
          const formattedEvents = data.map((event: any) => ({
            id: event.id,
            text: event.title,
            start: event.startDate,
            end: event.endDate,
            color: getEventColor(event.type),
            resource: event.location,
            type: event.type,
            location: event.location,
            description: event.description,
          }))
          setEvents(formattedEvents)
        },
      },
    )
  }

  function getEventColor(type: string): string {
    switch (type) {
      case "class":
        return "#3174ad"
      case "assignment":
        return "#6aa84f"
      case "exam":
        return "#e69138"
      case "meeting":
        return "#8e7cc3"
      case "personal":
        return "#c27ba0"
      default:
        return "#3174ad"
    }
  }

  function handleEventClick(args: any) {
    const event = args.e.data
    setSelectedEvent(event)
    setNewEvent({
      text: event.text,
      start: event.start,
      end: event.end,
      color: event.color,
      type: event.type || "class",
      location: event.location || "",
      description: event.description || "",
    })
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

  function handleSaveEvent() {
    if (!newEvent.text) {
      toast.error("Event title is required")
      return
    }

    if (selectedEvent) {
      // Update existing event
      updateEvent(
        {
          id: selectedEvent.id,
          data: {
            title: newEvent.text,
            startDate: newEvent.start,
            endDate: newEvent.end,
            type: newEvent.type as string,
            location: newEvent.location,
            description: newEvent.description,
          },
        },
        {
          onSuccess: () => {
            loadEvents()
            setIsEventDialogOpen(false)
          },
        },
      )
    } else {
      // Create new event
      createEvent(
        {
          title: newEvent.text as string,
          startDate: newEvent.start as string,
          endDate: newEvent.end as string,
          type: newEvent.type as string,
          location: newEvent.location,
          description: newEvent.description,
          allDay: false,
          visibility: "private",
        },
        {
          onSuccess: () => {
            loadEvents()
            setIsEventDialogOpen(false)
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
        },
      })
    }
  }

  function handleNavigatorChange(newDate: Date) {
    setDate(newDate)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Card className="md:w-64">
          <CardContent className="p-4">
            <DayPilotNavigator
              selectMode={"day"}
              showMonths={1}
              skipMonths={1}
              startDate={date}
              selectionDay={date}
              onTimeRangeSelected={(args) => {
                handleNavigatorChange(args.day)
              }}
            />
            <div className="mt-4">
              <Button
                className="w-full mb-2"
                onClick={() => {
                  setSelectedEvent(null)
                  setNewEvent({
                    text: "",
                    start: new Date().toISOString(),
                    end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
                    color: "#3174ad",
                    type: "class",
                    location: "",
                    description: "",
                  })
                  setIsEventDialogOpen(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setDate(new Date())}>
                Today
              </Button>
            </div>
          </CardContent>
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
              <div className="text-lg font-semibold">{format(date, "MMMM yyyy")}</div>
            </div>

            <TabsContent value="day" className="mt-0">
              <div className="h-[calc(100vh-300px)]">
                <DayPilotCalendar {...dayConfig} ref={calendarRef} events={events} startDate={date} />
              </div>
            </TabsContent>

            <TabsContent value="week" className="mt-0">
              <div className="h-[calc(100vh-300px)]">
                <DayPilotCalendar {...weekConfig} ref={calendarRef} events={events} startDate={date} />
              </div>
            </TabsContent>

            <TabsContent value="month" className="mt-0">
              <div className="h-[calc(100vh-300px)]">
                <DayPilotMonth {...monthConfig} ref={monthRef} events={events} startDate={date} />
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              <div className="h-[calc(100vh-300px)]">
                <DayPilotCalendar {...resourcesConfig} ref={calendarRef} events={events} startDate={date} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Event Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newEvent.text || ""}
                onChange={(e) => setNewEvent({ ...newEvent, text: e.target.value })}
                placeholder="Event title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start">Start</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newEvent.start && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newEvent.start ? format(new Date(newEvent.start), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newEvent.start ? new Date(newEvent.start) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          const currentDate = newEvent.start ? new Date(newEvent.start) : new Date()
                          date.setHours(currentDate.getHours())
                          date.setMinutes(currentDate.getMinutes())
                          setNewEvent({ ...newEvent, start: date.toISOString() })
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={newEvent.start ? format(new Date(newEvent.start), "HH:mm") : ""}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(":").map(Number)
                    const date = newEvent.start ? new Date(newEvent.start) : new Date()
                    date.setHours(hours)
                    date.setMinutes(minutes)
                    setNewEvent({ ...newEvent, start: date.toISOString() })
                  }}
                  className="mt-2"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="end">End</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newEvent.end && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newEvent.end ? format(new Date(newEvent.end), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newEvent.end ? new Date(newEvent.end) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          const currentDate = newEvent.end ? new Date(newEvent.end) : new Date()
                          date.setHours(currentDate.getHours())
                          date.setMinutes(currentDate.getMinutes())
                          setNewEvent({ ...newEvent, end: date.toISOString() })
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={newEvent.end ? format(new Date(newEvent.end), "HH:mm") : ""}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(":").map(Number)
                    const date = newEvent.end ? new Date(newEvent.end) : new Date()
                    date.setHours(hours)
                    date.setMinutes(minutes)
                    setNewEvent({ ...newEvent, end: date.toISOString() })
                  }}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Event Type</Label>
              <Select
                value={newEvent.type || "class"}
                onValueChange={(value) => setNewEvent({ ...newEvent, type: value, color: getEventColor(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location || ""}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Event location"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newEvent.description || ""}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event description"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {selectedEvent && (
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEvent}>Save</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this event? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
