import { Hono } from 'hono';
import { createController, loginController } from './controller';

const authRoutes = new Hono();

// Ruta para el inicio de sesión
authRoutes.post('/login', loginController);
authRoutes.post('/account', createController);

export default authRoutes;