import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import appConstants from '../../core/utils/constants';

export type FoodDetailProps = {
  foodItem?: string;
};

const FoodDetailScreen = () => {
  const navigation = useNavigation<any>();

  const foodItem = {
    id: 'b-1',
    label: 'Special Burger',
    image: require('../../assets/images/basic-burger.jpg'),
  };

  const ingredients = [
    {
      id: '1',
      icon: '🍖',
      title: 'Onion',
    },
    {
      id: '2',
      icon: '🧅',
      title: 'Onion',
    },
    {
      id: '3',
      icon: '🥬',
      title: 'Lettuce',
    },
    {
      id: '4',
      icon: '🥕',
      title: 'Carrot',
    },
    {
      id: '5',
      icon: '🧂',
      title: 'Salt',
    },
    {
      id: '6',
      icon: '🌶',
      title: 'Pepper',
    },
  ];

  return (
    <View style={tw.style('flex-1 flex-col justify-between bg-white')}>
      <ImageBackground source={foodItem.image} resizeMode="cover">
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
              <View style={tw`h-8 w-8 rounded-2 bg-grey center shadow-sm`}>
                <Ionicons name="cart-outline" size={16} color="white" />
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 pt-6`}>
          <View style={tw`px-global `}>
            <Text style={tw`label font-bold text-accent`}>
              Wagyu A5 Rare hot
            </Text>
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
                  style={tw`bg-white rounded-full w-5 h-5 flex-shrink-0 center`}
                >
                  <Feather name="minus" size={14} />
                </TouchableOpacity>
                <View style={tw`px-4 center`}>
                  <Text>1</Text>
                </View>
                <TouchableOpacity
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
            {ingredients.map((item, i) => (
              <View
                style={tw.style(
                  'h-23 w-23 bg-lightgrey center p-1 rounded-2 mr-3',
                  [i === 0 ? 'ml-6' : '']
                )}
                key={item.id}
              >
                <Text style={tw`text-7 mb-1`}>{item.icon}</Text>
                <Text style={tw`body1 font-medium text-text-primary`}>
                  {item.title}
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
            <Text style={tw`body-big font-medium text-brand`}>$15.00</Text>
          </View>
          <TouchableOpacity
            style={tw`bg-accent w-[60%] center rounded-2`}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(appConstants.screens.cart)}
          >
            <Text style={tw` text-white body2 font-bold tracking-wide`}>
              + Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FoodDetailScreen;
