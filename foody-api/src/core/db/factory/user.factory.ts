import * as faker from 'faker';
import { IUser } from '../../../features/user/user';

export const userFactory = (data: Partial<IUser> = {}): Partial<IUser> => ({
  email: faker.internet.email(),
  password: 'secret',
  profile: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    location: faker.address.cityName(),
    gender: faker.name.gender(),
    website: faker.internet.url(),
  },
  ...data,
});
