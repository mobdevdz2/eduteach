import { Entity } from '@/classes/entity';
import { Materials } from '@/types/entities';

export class MaterialsClass extends Entity<Materials> {
  constructor(data: Materials[]) {
    super(data);
  }

  // Add custom methods or overrides for materials here
}
