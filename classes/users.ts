import { Entity } from '@/classes/entity';
import { Users } from '@/types/entities';

export class UsersClass extends Entity<Users> {
  constructor(data: Users[]) {
    super(data);
  }

  // Add custom methods or overrides for users here
}
