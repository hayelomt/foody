import Restaurant, { IRestaurant } from '../restaurant';
import RestaurantDto from './restaurant.dto';

const RestaurantService = {
  createRestaurant: async (data: any): Promise<IRestaurant> => {
    const createData = RestaurantDto.createRestaurantDto(data);

    return Restaurant.create(createData);
  },
  nameExists: async (name: string): Promise<boolean> => {
    const restaurant = await Restaurant.findOne({ name });

    return restaurant !== null;
  },
};

export default RestaurantService;
