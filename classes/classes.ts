import { Entity } from '@/classes/entity';
import { Classes } from '@/types/entities';

export class ClassesClass extends Entity<Classes> {
  constructor(data: Classes[]) {
    super(data);
  }

  // Add custom methods or overrides for classes here
}
