// lib/validations/event-schema.ts
import * as z from "zod"




// components/calendar/EventDialog.tsx
import { useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Trash2 } from "lucide-react"
import {CalendarEvents} from "@/types/entities"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { getEventColor } from "@/lib/calendar-utils"
import { EventForm } from "./EventForm"

interface EventDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  event: Partial<CalendarEvent>
  isEdit: boolean
  onSave: (values: any) => void
  onDelete: () => void
}

export function EventDialog({ 
  isOpen, 
  onOpenChange, 
  event, 
  isEdit, 
  onSave, 
  onDelete 
}: EventDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Event" : "Add Event"}</DialogTitle>
        </DialogHeader>
        
        <EventForm 
          defaultValues={event} 
          onSubmit={onSave} 
          isEdit={isEdit} 
          onDelete={onDelete} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  )
}

