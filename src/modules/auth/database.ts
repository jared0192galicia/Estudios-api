import { db } from "@connections/connections";
import { cuenta } from "@database/usuario";
import { eq } from 'drizzle-orm';

export async function queryGetAccoutByEmail(email: string) {
 const [data] = await db.select().from(cuenta).where(eq(cuenta.email, email));
 console.log("🚀 ~ data:", data)

 return data;
}