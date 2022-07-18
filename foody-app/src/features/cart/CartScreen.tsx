import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from '../../core/lib/tailwind';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import appConstants from '../../core/utils/constants';

type CartItem = {
  id: string;
  label: string;
  image: number;
  price: number;
  amount: number;
};

const CartScreen = () => {
  const navigation = useNavigation<any>();

  const cartItems: CartItem[] = [
    {
      id: 'b-1',
      label: 'Special Burger',
      image: require('../../assets/images/basic-burger.jpg'),
      price: 7,
      amount: 20,
    },
    {
      id: 'b-2',
      label: 'Taco Delight',
      image: require('../../assets/images/tacos.jpg'),
      price: 10,
      amount: 3,
    },
    {
      id: 'b-3',
      label: 'Double Burger',
      image: require('../../assets/images/double.jpg'),
      price: 15,
      amount: 1,
    },
    {
      id: 'b-4',
      label: 'Burrito',
      image: require('../../assets/images/burrito.jpg'),
      price: 20,
      amount: 2,
    },
  ];

  const CartCard = ({ cartItem }: { cartItem: CartItem }) => (
    <View
      style={tw`p-3 flex flex-row items-center bg-white shadow-lg mb-6 rounded-2`}
    >
      <Checkbox status="checked" color="#ee4d2a" />
      <View style={tw`flex-1 flex flex-row items-center ml-2`}>
        <View style={tw`h-18 w-18  mr-2`}>
          <Image
            source={cartItem.image}
            style={tw`h-18 w-18 rounded-3`}
            resizeMode="cover"
          />
        </View>
        <View
          style={tw`flex flex-col justify-between py-2 flex-shrink-1 w-full`}
        >
          <View style={tw`flex flex-col flex-shrink-1`}>
            <Text style={tw` text-text-gray sub1 mb-1 font-medium`}>
              🍔 Junk Food
            </Text>
            <Text style={tw.style('text-4.2 font-bold')}>{cartItem.label}</Text>
          </View>

          <Text style={tw`text-brand label font-bold`}>${cartItem.price}</Text>
        </View>
      </View>
      <View style={tw`flex flex-col justify-center items-center`}>
        <TouchableOpacity
          style={tw`bg-lightgrey rounded-full w-5 h-5 flex-shrink-0 center mb-2`}
        >
          <Feather name="minus" size={12} />
        </TouchableOpacity>
        <View style={tw`px-4 center mb-2`}>
          <Text>1</Text>
        </View>
        <TouchableOpacity
          style={tw`bg-accent rounded-full w-5 h-5 flex-shrink-0 center`}
        >
          <Feather name="plus" size={12} style={tw`text-white`} />
        </TouchableOpacity>
      </View>
    </View>
  );

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
          data={cartItems}
          keyExtractor={(i) => i.id}
          style={tw`pt-6`}
          contentContainerStyle={tw` px-global`}
          renderItem={({ item }) => <CartCard cartItem={item} />}
        />
      </View>

      <View
        style={tw`flex flex-row py-2 bg-white justify-between px-global shadow-md`}
      >
        <View style={tw`flex flex-col`}>
          <Text style={tw`body2 text-grey`}>Price</Text>
          <Text style={tw`body-big font-medium text-brand`}>$15.00</Text>
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
