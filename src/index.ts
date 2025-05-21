import { Hono } from 'hono';
import { authRoutes } from '@modules/auth/routes';

const app = new Hono();

app.route('/auth', authRoutes);

export default app;

Bun.serve({
  port: 3001,
  fetch: app.fetch,
});
