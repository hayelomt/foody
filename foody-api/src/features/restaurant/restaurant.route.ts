import { Router } from 'express';
import { imageUpload } from '../../core/middleware/file-upload';
import validate from '../../core/middleware/validate';
import RestaurantVal from './lib/restaurant.val';
import RestaurantController from './restaurant.controller';

const restaurantRouter = Router();

restaurantRouter.post(
  '/',
  imageUpload.single('image'),
  validate(RestaurantVal.createRules),
  RestaurantController.createRestaurant,
);

export default restaurantRouter;
