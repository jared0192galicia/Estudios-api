import { db } from '@connections/connections';
import { resultados_AD } from '@database/resultados_AD'; // Replace 'correctExportName' with the actual export name
import { eq } from 'drizzle-orm';

export async function queryInsertDataPerson({
  matricula,
  apPaterno,
  apMaterno,
  nombres,
  edad,
  sexo,
  fecha,
  cocaina,
  anfetamina,
  metanfetamina,
  opioides,
  cannabis,
}: any) {
  try {
    await db.insert(resultados_AD).values({
      matricula,
      apPaterno,
      apMaterno,
      nombres,
      edad,
      sexo,
      fecha,
      cocaina,
      anfetamina,
      metanfetamina,
      opioides,
      cannabis,
    });
  } catch (error) {
    console.log('Error inserting data:', error);
  }
}

export async function querySelectDataPerson() {
  const data = await db.select().from(resultados_AD);
  return data;
}

export async function querySelectDataPersonByMatricula(matricula: string) {
  const [data] = await db
    .select()
    .from(resultados_AD)
    .where(eq(resultados_AD.matricula, matricula));
  return data;
}
