import catchAsync from '../../core/utils/catch-async';
import RestaurantService from './lib/restaurant.service';

const RestaurantController = {
  createRestaurant: catchAsync(async (req, res) => {
    const restaurant = await RestaurantService.createRestaurant({
      ...req.body,
      ...req.file,
    });

    res.json({ data: restaurant });
  }),
};

export default RestaurantController;
