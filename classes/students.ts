import { Entity } from '@/classes/entity';
import { Students } from '@/types/entities';

export class StudentsClass extends Entity<Students> {
  constructor(data: Students[]) {
    super(data);
  }

  // Add custom methods or overrides for students here
}
