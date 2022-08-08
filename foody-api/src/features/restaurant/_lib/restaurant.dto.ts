import Money from '../../../core/models/money';

type CreateRestaurantDto = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  image: {
    size: number;
    path: string;
  };
  manager: string;
  deliveryRate: number;
};

const RestaurantDto = {
  createRestaurantDto: (data: any, managerId: string): CreateRestaurantDto => ({
    name: data.name,
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
    },
    image: {
      path: data.path,
      size: data.size,
    },
    manager: managerId,
    deliveryRate: Money.fromBill(data.deliveryRate).amount,
  }),
};

export default RestaurantDto;
