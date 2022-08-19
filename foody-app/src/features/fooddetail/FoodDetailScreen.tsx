import React, { useContext } from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import tw from '../../core/lib/tailwind';
import { RootStackParamList } from '../../core/utils/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ImageUtils from '../../core/utils/image-utils';
import MoneyUtils from '../../core/utils/money-utils';
import Cart from '../../core/ut/components/Cart';
import { OrderContext } from '../../core/state/OrderContext';
import useFoodDetailHook from './hooks/useFoodDetailHook';
import { Snackbar } from 'react-native-paper';

export type FoodDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'FoodDetailScreen'
>;

const FoodDetailScreen = ({ navigation, route }: FoodDetailProps) => {
  const { menuItem } = route.params;
  const {
    showMsg,
    currentItems,
    addItem,
    removeItem,
    getOrderCount,
    hideSnackbar,
    placeOrder,
  } = useFoodDetailHook(menuItem);

  return (
    <View style={tw.style('flex-1 flex-col justify-between bg-white')}>
      <ImageBackground
        source={{ uri: ImageUtils.getUrl(menuItem.image.path) }}
        resizeMode="cover"
      >
        <View
          style={tw.style('', {
            height: Dimensions.get('window').height * 0.4,
          })}
        >
          <SafeAreaView>
            <View style={tw`sizing-xs`} />
            <View style={tw`flex flex-row justify-between px-global`}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
              >
                <View style={tw`h-8 w-8 rounded-2 bg-grey center shadow-sm`}>
                  <Feather name="chevron-left" size={16} color="white" />
                </View>
              </TouchableOpacity>
              <Cart
                cartColor="white"
                containerColor="bg-grey"
                orderCount={getOrderCount()}
                onPress={() => navigation.navigate('CartScreen')}
              />
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 pt-6`}>
          <View style={tw`px-global `}>
            <Text style={tw`label font-bold text-accent`}>{menuItem.name}</Text>
            <View style={tw`flex flex-row justify-between items-end`}>
              <View style={tw`flex flex-row items-center`}>
                <Ionicons name="star" color="#EFCA30" size={16} />
                <Text style={tw`body2 text-accent font-medium mx-1`}>4.3</Text>
                <Text style={tw`body2 text-grey`}>(342 Reviews)</Text>
              </View>
              <View
                style={tw`bg-lightgrey py-1.1 px-2 rounded-2 flex flex-row items-center`}
              >
                <TouchableOpacity
                  disabled={currentItems <= 0}
                  onPress={removeItem}
                  style={tw`bg-white rounded-full w-5 h-5 flex-shrink-0 center`}
                >
                  <Feather name="minus" size={14} />
                </TouchableOpacity>
                <View style={tw`px-4 center`}>
                  <Text>{currentItems}</Text>
                </View>
                <TouchableOpacity
                  onPress={addItem}
                  style={tw`bg-white rounded-full w-5 h-5 flex-shrink-0 center`}
                >
                  <Feather name="plus" size={14} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`sizing-sm`} />
            <View style={tw`flex `}>
              <Text style={tw`text-text-gray text-3.5 leading-1.5`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, numquam esse. Iusto sit assumenda ducimus sunt
                aspernatur, ea voluptatum. Consequatur tempore aliquam
                consectetur voluptatem exercitationem porro one....
                <Text style={tw`body1 text-brand ml-2`}>Read More</Text>
              </Text>
            </View>
            <View style={tw`sizing-sm`} />
            <Text style={tw`label text-accent font-semibold`}>Ingredients</Text>
            <View style={tw`sizing-xs`} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {menuItem.ingredients.map((item, i) => (
              <View
                style={tw.style(
                  'h-23 w-23 bg-lightgrey center p-1 rounded-2 mr-3',
                  [i === 0 ? 'ml-6' : '']
                )}
                key={item._id}
              >
                <Text style={tw`text-7 mb-1`}>{`🍔`}</Text>
                <Text style={tw`body1 font-medium text-text-primary`}>
                  {item.name}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={tw`sizing-sm`} />
        </View>
      </ScrollView>

      <SafeAreaView>
        <View style={tw`flex flex-row px-global py-2 bg-white justify-between`}>
          <View style={tw`flex flex-col`}>
            <Text style={tw`body2 text-grey`}>Price</Text>
            <Text style={tw`body-big font-medium text-brand`}>
              {MoneyUtils.formatMoney(menuItem.price * currentItems)}
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-accent w-[60%] center rounded-2`}
            activeOpacity={0.7}
            onPress={placeOrder}
            disabled={currentItems === 0}
          >
            <Text style={tw` text-white body2 font-bold tracking-wide`}>
              + Add to cart
            </Text>
          </TouchableOpacity>
        </View>

        <Snackbar visible={showMsg} duration={2500} onDismiss={hideSnackbar}>
          Item added to order
        </Snackbar>
      </SafeAreaView>
    </View>
  );
};

export default FoodDetailScreen;
