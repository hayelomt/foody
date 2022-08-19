import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from '../../core/lib/tailwind';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import appConstants from '../../core/utils/constants';
import { OrderContext, OrderItem } from '../../core/state/OrderContext';
import MoneyUtils from '../../core/utils/money-utils';
import ImageUtils from '../../core/utils/image-utils';

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const { state, addOrder, decrementOrder, removeOrder, getOrderTotal } =
    useContext(OrderContext);

  const { orderItems } = state;

  const CartCard = ({
    orderItem: { menuItem, amount },
  }: {
    orderItem: OrderItem;
  }) => {
    return (
      <View
        style={tw`p-3 flex flex-row items-center bg-white shadow-lg mb-6 rounded-2`}
      >
        <TouchableOpacity onPress={() => removeOrder(menuItem)}>
          <Ionicons
            name="trash-bin"
            color="#ee4d2a"
            size={20}
            style={tw`mx-1`}
          />
        </TouchableOpacity>
        <View style={tw`flex-1 flex flex-row items-center ml-2`}>
          <View style={tw`h-18 w-18  mr-2`}>
            <Image
              source={{ uri: ImageUtils.getUrl(menuItem.image.path) }}
              style={tw`h-18 w-18 rounded-3`}
              resizeMode="cover"
            />
          </View>
          <View
            style={tw`flex flex-col justify-between py-2 flex-shrink-1 w-full`}
          >
            <View style={tw`flex flex-col flex-shrink-1`}>
              <Text style={tw` text-text-gray sub1 mb-1 font-medium`}>
                🍔 {menuItem.category}
              </Text>
              <Text style={tw.style('text-4.2 font-bold')}>
                {menuItem.name}
              </Text>
            </View>

            <Text style={tw`text-brand label font-bold`}>
              ${MoneyUtils.formatMoney(menuItem.price * amount)}
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-col justify-center items-center`}>
          <TouchableOpacity
            onPress={() => addOrder(state, menuItem, 1)}
            style={tw`bg-accent rounded-full w-5 h-5 flex-shrink-0 center`}
          >
            <Feather name="plus" size={12} style={tw`text-white`} />
          </TouchableOpacity>
          <View style={tw`px-4 center mb-2`}>
            <Text>{amount}</Text>
          </View>
          <TouchableOpacity
            onPress={() => decrementOrder(menuItem, 1)}
            disabled={amount === 0}
            style={tw`bg-lightgrey rounded-full w-5 h-5 flex-shrink-0 center mb-2`}
          >
            <Feather name="minus" size={12} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-between bg-lightgrey`}>
      <View>
        <View style={tw.style('')}>
          <View style={tw`sizing-xs`} />
          <View style={tw`flex flex-row justify-between px-global`}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <View style={tw`h-8 w-8 rounded-2 bg-white shadow-lg center`}>
                <Feather
                  name="chevron-left"
                  size={16}
                  style={tw`text-accent`}
                />
              </View>
            </TouchableOpacity>
            <View style={tw`h-8 w-8 rounded-2 bg-white shadow-lg center`}>
              <Ionicons
                name="chatbox-ellipses"
                size={16}
                style={tw`text-accent`}
              />
            </View>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={Object.values(orderItems).sort((a, b) =>
            a.menuItem.name.localeCompare(b.menuItem.name)
          )}
          keyExtractor={(i) => i.menuItem._id}
          style={tw`pt-6`}
          contentContainerStyle={tw` px-global`}
          renderItem={({ item }) => <CartCard orderItem={item} />}
        />
      </View>

      <View
        style={tw`flex flex-row py-2 bg-white justify-between px-global shadow-md`}
      >
        <View style={tw`flex flex-col`}>
          <Text style={tw`body2 text-grey`}>Price</Text>
          <Text style={tw`body-big font-medium text-brand`}>
            ${MoneyUtils.formatMoney(getOrderTotal())}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate(appConstants.screens.paymentSuccess)
          }
          style={tw`bg-accent w-[60%] center rounded-2`}
        >
          <Text style={tw` text-white body2 font-bold tracking-wide`}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
