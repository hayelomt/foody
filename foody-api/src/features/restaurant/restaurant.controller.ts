import catchAsync from '../../core/utils/catch-async';
import { RequestWithUser } from '../auth/lib/auth.middleware';
import RestaurantService from './lib/restaurant.service';

const RestaurantController = {
  createRestaurant: catchAsync(async (req: RequestWithUser, res) => {
    const restaurant = await RestaurantService.createRestaurant(
      {
        ...req.body,
        ...req.file,
      },
      req.user._id!,
    );

    res.json({ data: restaurant });
  }),
};

export default RestaurantController;
