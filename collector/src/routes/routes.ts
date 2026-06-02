import controllerRoute from '../modules/collector/collector.routes.js'
import authRoute from '../modules/auth/auth.routes.js'
import projectRoute from '../modules/project/project.routes.js'
import { Router } from 'express'


const routes = Router();

routes.use('/auth', authRoute);
routes.use('/collector', controllerRoute);
routes.use('/project', projectRoute);

export default routes;