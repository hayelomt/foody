import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../../core/lib/tailwind';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ClassInput } from 'twrnc/dist/esm/types';
// import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import appConstants, {
  RootStackParamList,
} from '../../../core/utils/constants';
import { MenuItem } from '../../restaurant/restaurant';
import ImageUtils from '../../../core/utils/image-utils';
import useHomeController from '../hooks/useHomeController';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { OrderContext } from '../../../core/state/OrderContext';
import TextUtils from '../../../core/utils/text-utils';
import Cart from '../../../core/ut/components/Cart';

type Food = {
  id: string;
  label: string;
  image: number;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeTab = ({ navigation }: HomeProps) => {
  const { data, tags } = useHomeController();
  const { getOrderCount } = useContext(OrderContext);

  const Header = () => (
    <View style={tw`flex flex-row justify-between px-global items-center`}>
      <View style={tw`h-8 w-8 rounded-2 bg-white center shadow-sm`}>
        <Ionicons name="menu" size={22} />
      </View>
      <View style={tw`flex flex-col items-center`}>
        <Text style={tw`sub1 text-text-gray font-medium`}>Location</Text>
        <View style={tw`flex flex-row items-end`}>
          <Ionicons name="location-sharp" style={tw`text-brand`} size={14} />
          <Text style={tw`body1 font-semibold`}>Addisu Gebeya, ETH</Text>
        </View>
      </View>
      <Cart orderCount={getOrderCount()} containerColor="bg-white" />
    </View>
  );

  const TagItem = ({
    active = false,
    label,
    style = [],
  }: {
    active?: boolean;
    label: string;
    style?: ClassInput[];
  }) => (
    <View
      style={tw.style(
        'px-3 py-1.5 rounded-4 mr-4',
        [active ? 'bg-brand' : 'bg-gray-200'],
        ...style
      )}
    >
      <Text
        style={tw.style('font-bold', [
          active ? 'text-white' : 'text-text-gray',
        ])}
      >
        {label}
      </Text>
    </View>
  );

  const MenuItemCard = ({
    menuItem,
    style = [],
  }: {
    menuItem: MenuItem;
    style?: ClassInput[];
  }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('FoodDetailScreen', { menuItem })}
      style={tw` mr-4`}
    >
      <ImageBackground
        style={tw.style('h-65 w-50 shadow-md p-3.5', ...style)}
        imageStyle={tw`rounded-2`}
        source={{ uri: ImageUtils.getUrl(menuItem.image.path) }}
      >
        <View
          style={tw.style(
            'h-full w-full flex flex-col justify-between items-start',
            {
              backgroundColor:
                'linear-gradient(180deg, rgba(249,249,255,0) 0%, rgba(3,0,2,0.6) 62%, rgba(1,9,10,0.9) 100%)',
            }
          )}
        >
          <View style={tw`bg-gray-500 bg-opacity-80 px-4 py-0.8 rounded-4`}>
            <Text style={tw` text-white sub1 font-medium`}>
              {menuItem.category}
            </Text>
          </View>

          <View style={tw`flex flex-row justify-between items-end w-full`}>
            <View style={tw`flex flex-col flex-shrink-1`}>
              <Text style={tw`text-white text-5 mb-1 font-bold pr-2`}>
                {menuItem.name}
              </Text>
              <Text style={tw`sub1 text-white`}>30 Min | 1Serving</Text>
            </View>

            <View style={tw`h-8 w-8 rounded-2 bg-grey center shadow-sm`}>
              <Ionicons name="heart-outline" size={20} color="white" />
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        tw`h-full bg-white text-red-500 dark:bg-black dark:text-white bg-bg-primary`,
        { flex: 0 },
      ]}
    >
      <View style={tw`sizing-xs`} />
      <Header />
      <ScrollView style={tw`flex-1 mt-2`}>
        <View style={tw`sizing-xs`} />
        <View style={tw`px-global w-full`}>
          <ImageBackground
            resizeMode="cover"
            style={tw`p-4`}
            imageStyle={tw`rounded-2`}
            source={require('../../../assets/images/table-food.jpg')}
          >
            <View
              style={tw`w-full rounded-1.5 bg-white py-2 px-4 flex justify-between`}
            >
              <View style={tw`flex flex-col`}>
                <Text style={tw`body2 font-bold mb-1`}>Hi, Granger!</Text>
                <Text style={tw`text-text-gray body1`}>
                  You've 23 discount ticket
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={tw`sizing-sm`} />

        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tags}
            keyExtractor={(i) => i.id}
            renderItem={({ item, index }) => (
              <TagItem
                label={item.label}
                active={index === 0}
                style={[{ 'ml-4': index === 0 }]}
              />
            )}
          />
        </View>

        <View style={tw`sizing-sm`} />

        <View style={tw``}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(i) => i._id}
            renderItem={({ item, index }) => (
              <MenuItemCard menuItem={item} style={[{ 'ml-5': index === 0 }]} />
            )}
          />
        </View>

        <View style={tw`sizing-sm`} />

        <View style={tw`px-global`}>
          <Text style={tw`label font-semibold`}>Near You</Text>
          <View style={tw`sizing-xxs`} />
        </View>

        <View style={tw`flex-1 px-global h-100`}>
          {/* <MapView
            style={tw`flex-1`}
            initialRegion={{
              latitude: 9.071378213355157,
              longitude: 38.72144437766514,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            zoomControlEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: 9.071378213355157,
                longitude: 38.72144437766514,
              }}
            />
          </MapView> */}
        </View>

        <View style={tw`sizing-sm`} />
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeTab;
