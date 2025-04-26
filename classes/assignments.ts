import { Entity } from '@/classes/entity';
import { Assignments } from '@/types/entities';

export class AssignmentsClass extends Entity<Assignments> {
  constructor(data: Assignments[]) {
    super(data);
  }

  // Add custom methods or overrides for assignments here
}
