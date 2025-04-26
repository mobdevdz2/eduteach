// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.DATABASE_URL || "";
console.log({connectionString});
export default defineConfig({
  dialect: "postgresql",  
  schema: "./db/schema/index.ts",
  dbCredentials: {
    url: connectionString,
  }
});
