import { Entity } from '@/classes/entity';
import { LessonPlans } from '@/types/entities';

export class LessonPlansClass extends Entity<LessonPlans> {
  constructor(data: LessonPlans[]) {
    super(data);
  }

  // Add custom methods or overrides for lessonPlans here
}
