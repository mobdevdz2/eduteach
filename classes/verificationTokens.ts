import { Entity } from '@/classes/entity';
import { VerificationTokens } from '@/types/entities';

export class VerificationTokensClass extends Entity<VerificationTokens> {
  constructor(data: VerificationTokens[]) {
    super(data);
  }

  // Add custom methods or overrides for verificationTokens here
}
