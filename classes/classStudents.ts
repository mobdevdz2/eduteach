import { Entity } from '@/classes/entity';
import { ClassStudents } from '@/types/entities';

export class ClassStudentsClass extends Entity<ClassStudents> {
  constructor(data: ClassStudents[]) {
    super(data);
  }

  // Add custom methods or overrides for classStudents here
}
