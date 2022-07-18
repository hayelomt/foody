import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import appConstants from '../../core/utils/constants';
import FavoriteTab from './tabs/FavoriteTab';
import HomeTab from './tabs/HomeTab';
import ProfileTab from './tabs/ProfileTab';
import SearchTab from './tabs/SearchTab';
import tw from '../../core/lib/tailwind';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={appConstants.screens.homeTabs.home}
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name={appConstants.screens.homeTabs.home}
        component={HomeTab}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={18}
              style={tw.style([focused ? 'text-brand' : ''])}
            />
          ),
        })}
      />
      <Tab.Screen
        name={appConstants.screens.homeTabs.searchTab}
        component={SearchTab}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search-outline"
              size={18}
              style={tw.style([focused ? 'text-brand' : ''])}
            />
          ),
        })}
      />
      <Tab.Screen
        name={appConstants.screens.homeTabs.favoriteTab}
        component={FavoriteTab}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="heart-outline"
              size={18}
              style={tw.style([focused ? 'text-brand' : ''])}
            />
          ),
        })}
      />
      <Tab.Screen
        name={appConstants.screens.homeTabs.profileTab}
        component={ProfileTab}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={18}
              style={tw.style([focused ? 'text-brand' : ''])}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
