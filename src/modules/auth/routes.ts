import { Hono } from 'hono';
import { loginController } from './controller';

const authRoutes = new Hono();

// Ruta para el inicio de sesión
authRoutes.post('/login', loginController);
authRoutes.post('/create', loginController);

export default authRoutes;