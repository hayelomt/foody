import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from '../../lib/tailwind';
import TextUtils from '../../utils/text-utils';

type CartProps = {
  cartColor?: string;
  containerColor?: string;
  orderCount: number;
};

const Cart = ({
  cartColor = 'black',
  containerColor = 'bg-white',
  orderCount,
}: CartProps) => {
  return (
    <View
      style={tw`h-8 w-8 rounded-2 ${containerColor} center shadow-sm relative`}
    >
      {orderCount > 0 ? (
        <View
          style={tw`h-[4] z-10 w-[4] bg-rose-600 rounded-full absolute top-[-1] right-0 center`}
        >
          <Text style={tw`text-white text-[2.5] font-bold mb-1`}>
            {TextUtils.formatOrderCount(orderCount)}
          </Text>
        </View>
      ) : (
        <></>
      )}
      <Ionicons name="ios-cart-outline" color={cartColor} size={22} />
    </View>
  );
};

export default Cart;
