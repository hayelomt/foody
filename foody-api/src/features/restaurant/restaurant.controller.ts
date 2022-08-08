import catchAsync from '../../core/utils/catchasync';
import { RequestWithUser } from '../auth/_lib/auth.middleware';
import RestaurantService from './_lib/restaurant.service';

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
