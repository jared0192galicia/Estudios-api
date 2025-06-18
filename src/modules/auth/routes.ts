import { Hono } from 'hono';
import { auth, createController, loginController } from './controller';
import { protect } from 'src/middleware/validate';

const authRoutes = new Hono();

// Ruta para el inicio de sesión
authRoutes.post('/login', loginController);
authRoutes.post('/account',protect(), createController);
authRoutes.post('/validar', auth);

export default authRoutes;