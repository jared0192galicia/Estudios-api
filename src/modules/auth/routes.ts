import { Hono } from 'hono';
import { loginController } from './controller';

const authRoutes = new Hono();

// Ruta para el inicio de sesión
authRoutes.get('/login', loginController);

export default authRoutes;