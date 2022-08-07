import { Types } from 'mongoose';
import Restaurant, { IRestaurant } from '../restaurant';
import RestaurantDto from './restaurant.dto';

const RestaurantService = {
  findOne: async (id: string) => {
    return Restaurant.findOne({ _id: id });
  },

  isManager: async (restaurantId: string, userId: Types.ObjectId) => {
    const restaurant = await RestaurantService.findOne(restaurantId);

    return restaurant.managerId.toString() === userId.toString();
  },

  createRestaurant: async (data: any, userId: string): Promise<IRestaurant> => {
    const createData = RestaurantDto.createRestaurantDto(data, userId);

    return Restaurant.create(createData);
  },

  nameExists: async (name: string): Promise<boolean> => {
    const restaurant = await Restaurant.findOne({ name });

    return restaurant !== null;
  },
};

export default RestaurantService;
