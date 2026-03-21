import controllerRoute from '../modules/collector/collector.routes.js'
import { Router } from 'express'


const routes = Router();

routes.use('/collector', controllerRoute);

export default routes;