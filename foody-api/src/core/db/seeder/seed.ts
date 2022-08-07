import Driver, { IDriver } from '../../../features/driver/driver';
import Manager, { IManager } from '../../../features/manager/manager';
import MenuItem, {
  IMenuItem,
  MenuItemType,
} from '../../../features/menuitem/menuitem';
import Restaurant, {
  IRestaurant,
} from '../../../features/restaurant/restaurant';
import User from '../../../features/user/user';

const clearDb = async () => {
  await Driver.deleteMany();
  await MenuItem.deleteMany();
  await Restaurant.deleteMany();
  await Manager.deleteMany();
  await User.deleteMany();
};

type FakeDataProps = {
  manager: Partial<IManager>;
  restaurant: Partial<IRestaurant>;
  drivers: Partial<IDriver>[];
  menuItems: Partial<IMenuItem>[];
};

const fakeData: FakeDataProps = {
  manager: {
    email: 'manager@foody.com',
    password: 'secret',
    profile: {
      name: 'Big Smoke',
    },
  },
  restaurant: {
    name: 'Chanoly',
    location: {
      latitude: 9.033107,
      longitude: 38.753875,
    },
    deliveryRate: 10,
    image: {
      size: 1.8,
      path: 'uploads/imgs/rest1.jpg',
    },
  },
  drivers: [
    {
      email: 'driver1@gmail.com',
      password: 'secret',
      profile: {
        name: 'Driver 1',
      },
    },
    {
      email: 'driver2@gmail.com',
      password: 'secret',
      profile: {
        name: 'Driver 2',
      },
    },
  ],
  menuItems: [
    {
      name: 'Special Burger',
      price: 30000,
      type: MenuItemType.Food,
      category: 'junk',
      tags: ['burger', 'fast food', 'special', 'meat'],
      image: {
        size: 1000,
        path: 'uploads/imgs/basic-burger.jpg',
      },
      cookTime: 25,
      available: true,
      ingredients: [
        { name: 'Onion', image: '' },
        { name: 'Meat', image: '' },
        { name: 'Bread', image: '' },
      ],
    },
    {
      name: 'Burrito',
      price: 18000,
      type: MenuItemType.Food,
      category: 'meat',
      tags: ['burrito', 'fast food', 'meat'],
      image: {
        size: 1000,
        path: 'uploads/imgs/burrito.jpg',
      },
      cookTime: 30,
      available: true,
      ingredients: [
        { name: 'Onion', image: '' },
        { name: 'Meat', image: '' },
        { name: 'Tortilla', image: '' },
      ],
    },
    {
      name: 'Cheese Burger',
      price: 20000,
      type: MenuItemType.Food,
      category: 'junk',
      tags: ['burger', 'cheese', 'fast food', 'meat'],
      image: {
        size: 1000,
        path: 'uploads/imgs/cheese-burger.jpg',
      },
      cookTime: 20,
      available: true,
      ingredients: [
        { name: 'Onion', image: '' },
        { name: 'Meat', image: '' },
        { name: 'Bread', image: '' },
        { name: 'Cheese', image: '' },
      ],
    },
    {
      name: 'Taco',
      price: 21999,
      type: MenuItemType.Food,
      category: 'meat',
      tags: ['taco', 'fast food', 'meat'],
      image: {
        size: 1000,
        path: 'uploads/imgs/tacos.jpg',
      },
      cookTime: 30,
      available: true,
      ingredients: [
        { name: 'Onion', image: '' },
        { name: 'Spice', image: '' },
        { name: 'Meat', image: '' },
        { name: 'Tortilla', image: '' },
      ],
    },
    {
      name: 'Double Burger',
      price: 39999,
      type: MenuItemType.Food,
      category: 'junk',
      tags: ['burger', 'double', 'fast food', 'meat'],
      image: {
        size: 1000,
        path: 'uploads/imgs/double.jpg',
      },
      cookTime: 20,
      available: true,
      ingredients: [
        { name: 'Onion', image: '' },
        { name: 'Meat', image: '' },
        { name: 'Bread', image: '' },
        { name: 'Cheese', image: '' },
      ],
    },
  ],
};

const seed = async () => {
  console.log('Start seeding 🚀');

  const manager = await Manager.create(fakeData.manager);
  const restaurant = await Restaurant.create({
    ...fakeData.restaurant,
    managerId: manager._id,
  });

  console.log('seeding drivers');
  for (const driver of fakeData.drivers) {
    await Driver.create({ ...driver, restaurantId: restaurant.id });
  }

  console.log('Seeding menu items');
  for (let i = 0; i < 30; i++) {
    let promises: Promise<any>[] = [];

    for (const menuItem of fakeData.menuItems) {
      promises.push(
        MenuItem.create({
          ...menuItem,
          restaurantId: restaurant._id,
          name: `${i + 1} ${menuItem.name}`,
        }),
      );
    }

    await Promise.all(promises);
  }

  console.log('Finished seeding 🧊');
  process.exit(0);
};

seed();
