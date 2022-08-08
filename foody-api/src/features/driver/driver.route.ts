import { Router } from 'express';
import validate from '../../core/middleware/validate';
import { isAuthenticated } from '../auth/_lib/auth.middleware';
import DriverController from './driver.controller';
import DriverVal from './_lib/driver.val';

const driverRouter = Router();

driverRouter.post(
  '/',
  isAuthenticated('manager'),
  validate(DriverVal.createDriverRules),
  DriverController.create,
);

export default driverRouter;
