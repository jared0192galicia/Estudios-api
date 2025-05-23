import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const nivelAcceso = pgTable('nivelAcceso', {
  idNivelAcceso: serial('idNivelAcceso').primaryKey(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
});

export const cuenta = pgTable('cuenta', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 255 }),
  usuario: varchar('usuario', { length: 255 }).unique(),
  clave: varchar('clave', { length: 255 }),
});