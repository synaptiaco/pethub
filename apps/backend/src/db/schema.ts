import { pgTable, uuid, varchar, integer, timestamp, text } from "drizzle-orm/pg-core";

export const pets = pgTable("pets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  species: varchar("species", { length: 50 }).notNull(), // i.e.: Dog, Cat, Bird
  breed: varchar("breed", { length: 100 }),
  birthDate: timestamp("birth_date"),
  age: integer("age"),
  ownerId: uuid("owner_id").notNull(), // ref to the owners table
  medicalNotes: text("medical_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});