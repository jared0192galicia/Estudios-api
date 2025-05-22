import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const nivelAcceso = pgTable('nivelAcceso', {
  idNivelAcceso: serial('idNivelAcceso').primaryKey(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
});

export const cuenta = pgTable('cuenta', {
  id: serial('id').primaryKey(),
  idNivelAcceso: integer('idNivelAcceso').references(() => nivelAcceso.idNivelAcceso),
  email: varchar('email', { length: 255 }).unique(),
  clave: varchar('clave', { length: 255 }),
});