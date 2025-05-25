import { Hono } from 'hono';
import { getAllController, uploadController } from './controller';

const dashboardRoutes = new Hono();

dashboardRoutes.post('/upload-excel', uploadController);
dashboardRoutes.get('/data', getAllController);

export default dashboardRoutes;