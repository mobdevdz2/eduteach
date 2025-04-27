// components/calendar/CalendarDayView.tsx
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react"
import {CalendarEvents} from "@/types/entities"

import { RefObject } from "react"

interface CalendarDayViewProps {
  events: CalendarEvents[]
  date:  DayPilot.Date
  calendarRef: RefObject<any>
  handleEventClick: (args: any) => void
  handleTimeRangeSelected: (args: any) => void
  handleBeforeEventRender: (args: any) => void
}

export function CalendarDayView({ 
  events, 
  date, 
  calendarRef,
  handleEventClick,
  handleTimeRangeSelected,
  handleBeforeEventRender
}: CalendarDayViewProps) {
  const config = {
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
