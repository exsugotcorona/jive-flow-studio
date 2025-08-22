import { pgTable, text, serial, integer, boolean, uuid, timestamp, pgEnum, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// Keep the original users table for backward compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Removed admin-related tables (profiles, user_roles, site_settings)

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Removed admin-related schema exports

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
// Removed admin-related type exports
