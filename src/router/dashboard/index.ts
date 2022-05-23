import { dashboardGet } from '@controller/dashboard/dashboard';
import { servicesGet, serviceCreateGet, serviceCreatePost } from '@controller/dashboard/services';
import express from 'express';

const dashboardRouter = express.Router();

dashboardRouter.get('/', dashboardGet);

dashboardRouter.get('/services/:serviceType', serviceCreateGet);
dashboardRouter.post('/services/:serviceType', serviceCreatePost);

dashboardRouter.get('/services/:serviceType/:serviceId', servicesGet);

export default dashboardRouter;