import { Entity } from '@/classes/entity';
import { Grades } from '@/types/entities';

export class GradesClass extends Entity<Grades> {
  constructor(data: Grades[]) {
    super(data);
  }

  // Add custom methods or overrides for grades here
}
