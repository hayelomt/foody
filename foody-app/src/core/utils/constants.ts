import { MenuItem } from '../../features/restaurant/restaurant';

export type RootStackParamList = {
  HomeScreen: undefined;
  CartScreen: undefined;
  FoodDetailScreen: { menuItem: MenuItem };
  PaymentSuccessScreen: undefined;
};

const appConstants = {
  screens: {
    cart: 'CartScreen',
    foodDetail: 'FoodDetailScreen',
    home: 'HomeScreen',
    homeTabs: {
      home: 'HomeTab',
      searchTab: 'SearchTab',
      favoriteTab: 'FavoriteTab',
      profileTab: 'ProfileTab',
    },
    paymentSuccess: 'PaymentSuccessScreen',
  },
  api: 'http://10.0.2.2:9989',
};

export default appConstants;
