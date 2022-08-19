import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../core/utils/constants';
import CartScreen from '../features/cart/CartScreen';
import FoodDetailScreen from '../features/fooddetail/FoodDetailScreen';
import HomeScreen from '../features/home/HomeScreen';
import PaymentSuccessScreen from '../features/payment/screens/PaymentSuccessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'HomeScreen'}
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
          <Stack.Screen
            name={'FoodDetailScreen'}
            component={FoodDetailScreen}
          />
          <Stack.Screen name={'CartScreen'} component={CartScreen} />
          <Stack.Screen
            name={'PaymentSuccessScreen'}
            component={PaymentSuccessScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppRoutes;
