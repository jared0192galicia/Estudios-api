import { db } from '@connections/connections';
import { cuenta } from '@database/cuenta';
import { eq } from 'drizzle-orm';

export async function queryGetAccoutByEmail(user: string) {
  const [data] = await db.select().from(cuenta).where(eq(cuenta.usuario, user));

  return data;
}

export async function queryInsertAccout(user: any) {
  const [data] = await db.insert(cuenta).values(user).returning({ id: cuenta.id });
  return data;
}

export async function queryUpdateAccountField(user: string, field: keyof typeof cuenta, value: any) {
  const [data] = await db
    .update(cuenta)
    .set({ [field]: value })
    .where(eq(cuenta.usuario, user))
    .returning({ id: cuenta.id });
  return data;
}
