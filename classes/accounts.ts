import { Entity } from '@/classes/entity';
import { Accounts } from '@/types/entities';

export class AccountsClass extends Entity<Accounts> {
  constructor(data: Accounts[]) {
    super(data);
  }

  // Add custom methods or overrides for accounts here
}
