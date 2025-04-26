import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema/';

// Create a PostgreSQL connection
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.tzelsfdqreposgtblroz:@eDUtEACH2025@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
const client = postgres(connectionString);
export const db = drizzle(client, { schema: { ...schema } });
