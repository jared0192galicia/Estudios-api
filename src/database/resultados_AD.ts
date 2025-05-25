import { date } from 'drizzle-orm/pg-core';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const resultados_AD = pgTable('resultados_AD', {
    id: serial('id').primaryKey(),
    matricula: varchar('matricula', {length: 255}),
    apPaterno: varchar('apPaterno', {length: 255}),
    apMaterno: varchar('apMaterno', {length: 255}),
    nombres: varchar('nombres', {length: 255}),
    edad: integer('edad'),
    sexo: varchar('sexo', {length:100}),
    fecha: date('fecha'),
    cocaina: varchar('cocaina', {length: 100}),
    anfetamina: varchar('anfetamina', {length: 100}),
    metanfetamina: varchar('metanfetamina', {length: 100}),
    opioides: varchar('opioides', {length: 100}),
    cannabis: varchar('cannabis', {length: 100})
});