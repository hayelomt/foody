import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import appConstants from '../core/utils/constants';
import CartScreen from '../features/cart/CartScreen';
import FoodDetailScreen from '../features/fooddetail/FoodDetailScreen';
import HomeScreen from '../features/home/HomeScreen';
import PaymentSuccessScreen from '../features/payment/screens/PaymentSuccessScreen';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={appConstants.screens.home}
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          <Stack.Screen
            name={appConstants.screens.home}
            component={HomeScreen}
          />
          <Stack.Screen
            name={appConstants.screens.foodDetail}
            component={FoodDetailScreen}
          />
          <Stack.Screen
            name={appConstants.screens.cart}
            component={CartScreen}
          />
          <Stack.Screen
            name={appConstants.screens.paymentSuccess}
            component={PaymentSuccessScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppRoutes;
