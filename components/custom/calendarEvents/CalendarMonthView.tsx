// components/calendar/CalendarMonthView.tsx
import { DayPilot, DayPilotMonth } from "@daypilot/daypilot-lite-react"
import { CalendarEvents } from "@/types/entities"
import { RefObject, useEffect, useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Tooltip } from "@/components/ui/tooltip"

interface CalendarMonthViewProps {
  events: CalendarEvents[]
  date: DayPilot.Date
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
  const [viewModel, setViewModel] = useState({
    eventHeight: 30,
    headerHeight: 30,
    cellHeight: 100,
    theme: "calendar_default"
  })

  useEffect(() => {
    // Update cell height based on window size
    const updateDimensions = () => {
      const availableHeight = window.innerHeight - 300
      const rows = 6 // Maximum number of rows in a month view
      const cellHeight = Math.max(80, Math.floor(availableHeight / rows))
      
      setViewModel(prev => ({
        ...prev,
        cellHeight: cellHeight,
        eventHeight: Math.max(25, Math.floor(cellHeight / 4))
      }))
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  const onBeforeEventRender = (args: DayPilot.MonthBeforeEventRenderArgs) => {
    // Get color from event or determine based on type
    const eventColor = args.data?.color || getEventTypeColor(args.data?.type || "class")
    const visibility = args.data?.visibility || "private"
    const isRecurring = args.data?.isRecurring || false
    
    // Visual styling
    args.data.backColor = eventColor + "dd" // Add transparency
    args.data.borderColor = DayPilot.ColorUtil.darker(eventColor)
    args.data.fontColor = getContrastColor(eventColor)
    
    // Text content based on your database schema
    const location = args.data?.location || ""
    const eventType = args.data?.type || "class"
    const allDay = args.data?.allDay || false
    
    // Calculate duration and format for tooltip
    const startTime = new DayPilot.Date(args.data.start).toString("h:mm tt")
    const endTime = new DayPilot.Date(args.data.end).toString("h:mm tt")
    const duration = allDay ? "All Day" : `${startTime} - ${endTime}`
    
    // Configure display areas within the event box
    args.data.areas = [
      
    ]
    
    // Add event type badge
    args.data.areas.push({
      id: "type",
      bottom: 5,
      left: 5,
      right: 5,
      height: 16,
      backColor: DayPilot.ColorUtil.darker(eventColor),
      fontColor: "#fff",
      text: eventType.charAt(0).toUpperCase() + eventType.slice(1),
      style: "font-size: 10px; text-align: center; line-height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border-radius: 4px;"
    })
    
    // Add icons for recurring and visibility status
    if (isRecurring) {
      args.data.areas.push({
        id: "recurring-icon",
        top: 5,
        right: 5,
        width: 16,
        height: 16,
        symbol: "⟳", // Recurring symbol
        fontColor: getContrastColor(eventColor),
        style: "display: flex; align-items: center; justify-content: center; font-size: 14px;"
      })
    }
    
    // Comprehensive tooltip
    args.data.toolTip = 
      ``;
  }

  const config = {
    viewType: "Month",
    headerHeight: viewModel.headerHeight,
    cellHeight: viewModel.cellHeight,
    eventHeight: viewModel.eventHeight,
    headerDateFormat: "dddd",
    eventDeleteHandling: "Update",
    eventMoveHandling: "Update",
    timeRangeSelectedHandling: "Enabled",
    onEventClick: handleEventClick,
    onTimeRangeSelected: handleTimeRangeSelected,
    onBeforeEventRender: onBeforeEventRender,
    theme: viewModel.theme,
    businessBeginsHour: 8,
    businessEndsHour: 18,
    cellsWeekend: true,
    heightSpec: "BusinessHours",
    weekStarts: 0, // Sunday
    locale: "en-us",
    cssOnly: true,
    cssClassPrefix: "month_default_",
    showToolTip: true,
    // Additional options for better user experience
    eventCorners: "Rounded", // Rounded corners
    eventResizeHandling: "Update",
    cellMarginBottom: 5, // Space at the bottom of each day cell
    allowEventOverlap: false,
    eventStackingLineHeight: 5,
    scrollHeight: "100%"
  } as DayPilot.MonthConfig

  return (
    <div className="h-[calc(100vh-300px)]">
      <DayPilotMonth
        {...config}
        ref={monthRef}
        events={events}
        startDate={date}
        eventHeight={50}
        eventBorderRadius={10}
        
      />
    </div>
  )
}

// Helper function to determine text color based on background color for better contrast
function getContrastColor(hexColor: string): string {
  // Remove any transparency suffix
  const color = hexColor.replace(/[0-9a-f]{2}$/i, "")
  
  // Convert hex to RGB
  let r = 0, g = 0, b = 0
  if (color.length === 4) {
    // 3-digit hex
    r = parseInt(color[1] + color[1], 16)
    g = parseInt(color[2] + color[2], 16)
    b = parseInt(color[3] + color[3], 16)
  } else if (color.length === 7) {
    // 6-digit hex
    r = parseInt(color.substring(1, 3), 16)
    g = parseInt(color.substring(3, 5), 16)
    b = parseInt(color.substring(5, 7), 16)
  }
  
  // Calculate luminance - human eye favors green
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  // Return white for dark colors, black for light colors
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

// Get color based on event type
function getEventTypeColor(type: string): string {
  const colorMap: Record<string, string> = {
    class: "#3d85c6", // Blue
    assignment: "#6aa84f", // Green
    exam: "#e69138", // Orange
    meeting: "#8e7cc3", // Purple
    holiday: "#cc0000", // Red
    personal: "#f1c232", // Yellow
    reminder: "#999999", // Gray
    default: "#3d85c6" // Default blue
  }
  
  return colorMap[type] || colorMap.default
}