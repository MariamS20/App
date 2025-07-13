import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  struggle: text("struggle").notNull(), // "discipline" or "consistency"
  habit: text("habit").notNull(),
  learned: text("learned"),
  liked: text("liked"),
  feedback: text("feedback"),
  completedWorkouts: integer("completed_workouts").default(0),
  workoutDays: text("workout_days").array().default([]), // Array of completed workout days
  
  // New fields for additional features
  todos: text("todos").array().default([]), // Array of todo items
  journalEntries: text("journal_entries").array().default([]), // Array of journal entries
  gratitudeEntries: text("gratitude_entries").array().default([]), // Array of gratitude entries
  moodEntries: text("mood_entries").array().default([]), // Array of mood entries with dates
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const updateUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = typeof users.$inferSelect;
