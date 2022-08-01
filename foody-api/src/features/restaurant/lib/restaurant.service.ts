import Findable from '../../../core/contracts/findable';
import Restaurant, { IRestaurant } from '../restaurant';
import RestaurantDto from './restaurant.dto';

const RestaurantService: Findable & Record<string, any> = {
  async findOne(id: string) {
    return Restaurant.findOne({ _id: id });
  },

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
