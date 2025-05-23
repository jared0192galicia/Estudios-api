import { Hono } from 'hono';
import auth from '@modules/auth/routes';
import welcomeMessage from '@lib/welcome';
import { logger } from 'hono/logger'; 

// Aplicación Hono para manejar rutas
const app = new Hono();

console.log(Bun.randomUUIDv7());


// Middleware para logging
app.use('*', logger()); 

// Rutas de autenticación
app.route('/sesion', auth);

//  Inicializa el servidor
Bun.serve({
  port: 3001,
  fetch: app.fetch,
});

welcomeMessage();