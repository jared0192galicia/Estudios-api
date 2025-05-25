import { Hono } from 'hono';
import { auth, createController, loginController } from './controller';

const authRoutes = new Hono();

// Ruta para el inicio de sesión
authRoutes.post('/login', loginController);
authRoutes.post('/account', createController);
authRoutes.post('/validar', auth);

export default authRoutes;