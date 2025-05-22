import { Hono } from 'hono';
import auth from '@modules/auth/routes';
import welcomeMessage from '@lib/welcome';

// Aplicación Hono para manejar rutas
const app = new Hono();

// Rutas de autenticación
app.route('/sesion', auth);

//  Inicializa el servidor
Bun.serve({
  port: 3001,
  fetch: app.fetch,
});

welcomeMessage();

export default app;