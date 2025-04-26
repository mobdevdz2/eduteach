import { Entity } from '@/classes/entity';
import { Subscriptions } from '@/types/entities';

export class SubscriptionsClass extends Entity<Subscriptions> {
  constructor(data: Subscriptions[]) {
    super(data);
  }

  // Add custom methods or overrides for subscriptions here
}
