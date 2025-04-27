// components/calendar/CalendarResourcesView.tsx
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react"
import {CalendarEvents} from "@/types/entities"

import { RefObject } from "react"

interface CalendarResourcesViewProps {
  events: CalendarEvents[]
  date:  DayPilot.Date
  calendarRef: RefObject<any>
  handleEventClick: (args: any) => void
  handleTimeRangeSelected: (args: any) => void
  handleBeforeEventRender: (args: any) => void
}

export function CalendarResourcesView({ 
  events, 
  date, 
  calendarRef,
  handleEventClick,
  handleTimeRangeSelected,
  handleBeforeEventRender
}: CalendarResourcesViewProps) {
  const config = {
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

  return (
    <div className="h-[calc(100vh-300px)]">
      <DayPilotCalendar 
        {...config} 
        ref={calendarRef} 
        events={events} 
        startDate={date} 
      />
    </div>
  )
}