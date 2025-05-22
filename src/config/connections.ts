import { drizzle } from 'drizzle-orm/node-postgres';

/**
 * Conexion para la base de datos de postgres
 */
export const db = drizzle(Bun.env.POSTGRE_URL);
