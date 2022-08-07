type DriverCreateDto = {
  email: string;
  password: string;

  profile: {
    name: string;
  };
  restaurantId: string;
};

const DriverDto = {
  createDriver: (data: any): DriverCreateDto => ({
    email: data.email,
    password: data.password,
    profile: {
      name: data.name,
    },
    restaurantId: data.restaurantId,
  }),
};

export default DriverDto;
