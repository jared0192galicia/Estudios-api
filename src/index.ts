import { Hono } from 'hono';
import auth from '@modules/auth/routes';
import welcomeMessage from '@lib/welcome';
import { logger } from 'hono/logger';
import dashboardRoutes from '@modules/dashboard/routes';

import { cors } from 'hono/cors';

// INSERT INTO cuenta ( nombre, usuario, clave ) VALUES(
//   'Jared Galicia', 'jared', '$argon2id$v=19$m=65536,t=2,p=1$tEDI2nzwlU8vVsTw4YDsi/89OJs2rscp5EJIw4XrjIs$HSwaOFLw52TtnMBtn78mGNlKfljLYBKcq0S6DnuqSpQ'
// );

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
