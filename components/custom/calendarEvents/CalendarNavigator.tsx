// components/calendar/CalendarNavigator.tsx
import { DayPilot, DayPilotNavigator } from "@daypilot/daypilot-lite-react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Calendar } from "@/components/ui"

interface CalendarNavigatorProps {
  date: DayPilot.Date
  onDateChange: (date: DayPilot.Date) => void
  onAddEvent: () => void
}

export function CalendarNavigator({ date, onDateChange, onAddEvent }: CalendarNavigatorProps) {
  return (
    <CardContent className="p-4">
       {/* <Calendar
      mode="single"
      selected={date.toDate()}
      onSelect={(date) => {
        onDateChange(new DayPilot.Date(date?.toISOString()))
      }}
      className="rounded-md border shadow"
    /> */}
      <div className="mt-4">
        <Button
          className="w-full mb-2"
          onClick={onAddEvent}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
        <Button variant="outline" className="w-full" onClick={() => onDateChange(new  DayPilot.Date())}>
          Today
        </Button>
      </div>
    </CardContent>
  )
}

