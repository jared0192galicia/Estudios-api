import { Hono } from 'hono';
import auth from '@modules/auth/routes';
import welcomeMessage from '@lib/welcome';
import { logger } from 'hono/logger';
import dashboardRoutes from '@modules/dashboard/routes';

import { cors } from 'hono/cors';
import { compress } from 'hono/compress';

// Aplicación Hono para manejar rutas
const app = new Hono();

console.log(Bun.randomUUIDv7());

// Middlewares
app.use('*', logger());
app.use('*', cors());
// app.use(compress());

// Rutas de autenticación
app.route('/sesion', auth);
app.route('/dashboard', dashboardRoutes);

//  Inicializa el servidor
Bun.serve({
  port: 3001,
  fetch: app.fetch,
});

welcomeMessage();
