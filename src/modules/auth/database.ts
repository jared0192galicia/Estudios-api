import { db } from "@connections/connections";
import { cuenta } from "@database/cuenta";
import { eq } from 'drizzle-orm';

export async function queryGetAccoutByEmail(user: string) {
  const [data] = await db.select().from(cuenta).where(eq(cuenta.usuario, user));

  return data;
}