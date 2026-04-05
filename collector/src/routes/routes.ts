import controllerRoute from '../modules/collector/collector.routes.js'
import authRoute from '../modules/auth/auth.routes.js'
import { Router } from 'express'


const routes = Router();

routes.use('/auth', authRoute);
routes.use('/collector', controllerRoute);

export default routes;