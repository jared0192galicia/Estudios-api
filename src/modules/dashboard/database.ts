import { db } from "@connections/connections";
import { resultados_AD } from "@database/resultados_AD"; // Replace 'correctExportName' with the actual export name
import { eq } from 'drizzle-orm';


export async function queryInsertDataPerson(matricula: string, apPaterno: string, apMaterno: string, nombres: string, edad: number, sexo: string, fecha: Date, cocaina: string, anfetamina: string, metanfetamina: string, opioides: string, cannabis: string) {
    try {
        const data = await db.insert(resultados_AD).values({
            matricula, apPaterno,
            apMaterno,
            nombres,
            edad,
            sexo,
            fecha: fecha.toISOString().split('T')[0],
            cocaina,
            anfetamina,
            metanfetamina,
            opioides,
            cannabis
        });
        console.log('🚀 ~ data:', data);
        return data;
    } catch (error) {
        console.log('Error inserting data:', error);
    }
    
}

export async function querySelectDataPerson() {
    const data = await db.select().from(resultados_AD);
    console.log('🚀 ~ data:', data);
    return data;
}

export async function querySelectDataPersonByMatricula(matricula: string) {
    const [data] = await db.select().from(resultados_AD).where(eq(resultados_AD.matricula, matricula));
    console.log('🚀 ~ data:', data);
    return data;
}
