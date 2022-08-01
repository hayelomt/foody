import { Router } from 'express';
import { imageUpload } from '../../core/middleware/fileupload';
import validate from '../../core/middleware/validate';
import { isAuthenticated } from '../auth/lib/auth.middleware';
import RestaurantVal from './lib/restaurant.val';
import RestaurantController from './restaurant.controller';

const restaurantRouter = Router();

restaurantRouter.post(
  '/',
  isAuthenticated('manager'),
  imageUpload.single('image'),
  validate(RestaurantVal.createRules),
  RestaurantController.createRestaurant,
);

export default restaurantRouter;
