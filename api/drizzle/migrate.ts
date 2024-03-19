import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql } from "@vercel/postgres";

dotenv.config();
const db = drizzle(sql);

const runMigrations = async () => {
  try {
    await migrate(db, { migrationsFolder: "api/drizzle/migrations" });

    console.log("Migration successful!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMigrations();
