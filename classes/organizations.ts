import { Entity } from '@/classes/entity';
import { Organizations } from '@/types/entities';

export class OrganizationsClass extends Entity<Organizations> {
  constructor(data: Organizations[]) {
    super(data);
  }

  // Add custom methods or overrides for organizations here
}
