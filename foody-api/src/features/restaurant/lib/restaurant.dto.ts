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
};

const RestaurantDto = {
  createRestaurantDto: (data: any): CreateRestaurantDto => ({
    name: data.name,
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
    },
    image: {
      path: data.path,
      size: data.size,
    },
  }),
};

export default RestaurantDto;
