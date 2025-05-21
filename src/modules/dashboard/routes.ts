import { Hono } from 'hono';
import { loginController } from './controller';

export const authRoutes = new Hono();

authRoutes.post('/login', loginController);
