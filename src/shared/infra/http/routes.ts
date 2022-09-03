import { Router } from 'express';
import { DashboardController } from 'src/app/controllers/DashboardController';
import { JobController } from 'src/app/controllers/JobController';
import { ProfileController } from 'src/app/controllers/ProfileController';

export const routes = Router();

routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)
