import { Entity } from '@/classes/entity';
import { CalendarEvents } from '@/types/entities';

export class CalendarEventsClass extends Entity<CalendarEvents> {
  constructor(data: CalendarEvents[]) {
    super(data);
  }

  // Add custom methods or overrides for calendarEvents here
}
