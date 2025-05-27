import { read, utils } from 'xlsx';
import {
  queryInsertDataPerson,
  querySelectDataPerson,
  querySelectDataPersonByIds,
} from './database';
import type { ParsedRow, ResultadoAD } from '@my-types/dashboard';
import { readFile } from 'fs/promises';
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import { join } from 'path';
import fs from 'fs';

export async function uploadController(context: any) {
  const formData = await context.req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return context.json(
      { success: false, message: 'Archivo no encontrado' },
      400
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const workbook = read(arrayBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const data = utils.sheet_to_json(worksheet, { range: 1 });

  // Normalizar fechas
  const parsed = data.map((row: any) => {
    const rawDate = row['Fecha de valoración'];
    return {
      ...row,
      'Fecha de valoración':
        typeof rawDate === 'number' ? excelDateToJSDate(rawDate) : rawDate,
    };
  });

  const resultadosAD: ResultadoAD[] = mapParsedToResultadosAD(parsed);

  for (const row of resultadosAD) {
    await queryInsertDataPerson(row);
  }

  return context.json({ success: true, data: parsed }, 200);
}

export async function getAllController(context: any) {
  try {
    const data = await querySelectDataPerson();

    if (!data || data.length === 0) return context.json([], 204);

    return context.json(data, 200);
  } catch (error) {
    console.log('Error:', error);
    return context.json(
      { success: false, message: 'Error al obtener datos' },
      500
    );
  }
}

function excelDateToJSDate(serial: number): string {
  const utc_days = Math.floor(serial - 25569 + 1); // compensar bug de Excel
  const utc_value = utc_days * 86400; // segundos
  const date_info = new Date(utc_value * 1000);

  // Ajuste por zona horaria (opcional)
  const day = date_info.getUTCDate().toString().padStart(2, '0');
  const month = (date_info.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date_info.getUTCFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`; // ejemplo: 21/05/25
}

function convertFechaDDMMYYToISO(fechaStr: string): string {
  const [dd, mm, yy] = fechaStr.split('/');
  const yyyy = parseInt(yy, 10) > 50 ? `19${yy}` : `20${yy}`;
  return `${yyyy}-${mm}-${dd}`;
}

function mapParsedToResultadosAD(parsed: ParsedRow[]): ResultadoAD[] {
  return parsed.map((row, i) => {
    return {
      matricula: row['Matrícula'],
      apPaterno: row['Ap_Paterno'] ?? '',
      apMaterno: row['Ap_Materno'] ?? '',
      nombres: row['Nombre(s)'] ?? '',
      edad: Number(row['Edad']) || 0,
      sexo: row['Sexo'] ?? '',
      fecha: convertFechaDDMMYYToISO(row['Fecha de valoración']),
      cocaina: row['Cocaína'] ?? '',
      anfetamina: row['Anfetaminas'] ?? '',
      metanfetamina: row['Metaanfetaminas'] ?? '',
      opioides: row['Opioides'] ?? '',
      cannabis: row['Cannabis (THC)'] ?? '',
    };
  });
}

export async function generarPDFController(context: any) {
  // Recuperar parámetros del request usando Hono (query params en GET)
  const params = context.req.query();
  const idsParam = params.ids ?? '';
  const ids = idsParam
    .split(',')
    .map((id: any) => id.trim())
    .filter((id: any) => id.length > 0);

  const data = await querySelectDataPersonByIds(ids);

  const datos = data[0];

  // Cargar plantilla Handlebars
  const templatePath = join(import.meta.dir, '../../templates/FormatoPDF.hbs');
  const templateContent = await readFile(templatePath, 'utf-8');
  const template = Handlebars.compile(templateContent);

  const imagenBase64 = fs.readFileSync('./public/image.png', 'base64');
  // const html = template({ ...datos, imagenBase64 });

  // Generar HTML concatenado para todos los registros
  const html = data
    .map((datos: any) => template({ ...datos, imagenBase64 }))
    .join('<div style="page-break-after: always;"></div>'); // saltos de página

  // Generar PDF con Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  // Retornar PDF al frontend
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="factura.pdf"',
    },
  });
}
