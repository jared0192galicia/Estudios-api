import { Hono } from 'hono';
import { getAllController, uploadController } from './controller';
import { protect } from 'src/middleware/validate';

const dashboardRoutes = new Hono();

dashboardRoutes.post('/upload-excel', protect(), uploadController);
dashboardRoutes.get('/data', protect(), getAllController);
dashboardRoutes.get('/file', protect(), getAllController);

export default dashboardRoutes;
