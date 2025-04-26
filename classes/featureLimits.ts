import { Entity } from '@/classes/entity';
import { FeatureLimits } from '@/types/entities';

export class FeatureLimitsClass extends Entity<FeatureLimits> {
  constructor(data: FeatureLimits[]) {
    super(data);
  }

  // Add custom methods or overrides for featureLimits here
}
