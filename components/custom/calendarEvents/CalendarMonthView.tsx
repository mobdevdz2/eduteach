// components/calendar/CalendarMonthView.tsx
import { DayPilot, DayPilotMonth } from "@daypilot/daypilot-lite-react"
import {CalendarEvents} from "@/types/entities"

import { RefObject } from "react"

interface CalendarMonthViewProps {
  events: CalendarEvents[]
  date:  DayPilot.Date
  monthRef: RefObject<any>
  handleEventClick: (args: any) => void
  handleTimeRangeSelected: (args: any) => void
  handleBeforeEventRender: (args: any) => void
}

export function CalendarMonthView({ 
  events, 
  date, 
  monthRef,
  handleEventClick,
  handleTimeRangeSelected,
  handleBeforeEventRender
}: CalendarMonthViewProps) {
  const config = {
    cellHeight: 60,
    eventDeleteHandling: "Update",
    onEventClick: handleEventClick,
    onTimeRangeSelected: handleTimeRangeSelected,
    onBeforeEventRender: handleBeforeEventRender,
  }

  return (
    <div className="h-[calc(100vh-300px)]">
      <DayPilotMonth 
        {...config} 
        ref={monthRef} 
        events={events} 
        startDate={date} 
      />
    </div>
  )
}
