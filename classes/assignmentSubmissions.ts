import { Entity } from '@/classes/entity';
import { AssignmentSubmissions } from '@/types/entities';

export class AssignmentSubmissionsClass extends Entity<AssignmentSubmissions> {
  constructor(data: AssignmentSubmissions[]) {
    super(data);
  }

  // Add custom methods or overrides for assignmentSubmissions here
}
