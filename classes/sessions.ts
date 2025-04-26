import { Entity } from '@/classes/entity';
import { Sessions } from '@/types/entities';

export class SessionsClass extends Entity<Sessions> {
  constructor(data: Sessions[]) {
    super(data);
  }

  // Add custom methods or overrides for sessions here
}
