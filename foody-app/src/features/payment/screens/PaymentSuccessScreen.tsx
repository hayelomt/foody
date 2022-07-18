import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from '../../../core/lib/tailwind';

const PaymentSuccessScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 justify-between`}>
      <View style={tw.style('center flex-1 bg-lightgrey')}>
        <View
          style={tw`flex flex-col  px-4 pt-20 pb-4 bg-white items-center relative`}
        >
          <Text style={tw`text-brand body1 mb-2`}>Great!</Text>
          <Text style={tw`label text-accent font-bold mb-4`}>
            Payment success
          </Text>

          <View style={tw`flex flex-col w-full min-w-50 mb-16`}>
            <View style={tw`flex flex-row justify-between mb-3`}>
              <Text style={tw` body1 font-medium text-text-gray`}>
                Form Bank
              </Text>
              <Text style={tw` body1 font-semibold`}>ViSA</Text>
            </View>

            <View style={tw`flex flex-row justify-between mb-3`}>
              <Text style={tw` body1 font-medium text-text-gray`}>Pay</Text>
              <Text style={tw` body1 font-semibold`}>$45.00</Text>
            </View>

            <View style={tw`flex flex-row justify-between mb-3`}>
              <Text style={tw` body1 font-medium text-text-gray`}>
                Administration
              </Text>
              <Text style={tw` body1 font-semibold`}>$1.50</Text>
            </View>

            <View style={tw`flex flex-row justify-between mb-3`}>
              <Text style={tw` body1 font-medium text-text-gray`}>
                Pay Date
              </Text>
              <Text style={tw` body1 font-semibold`}>Feb 2, 2022</Text>
            </View>
          </View>

          <View style={tw`flex flex-col`}>
            <Text style={tw`body1 text-text-gray font-semibold mb-2`}>
              Total pay
            </Text>
            <Text style={tw`label text-brand font-bold`}>$56.55</Text>
          </View>

          <View
            style={tw.style(`absolute rounded-full bg-lightgrey `, {
              left: 0,
              bottom: 60,
              width: 40,
              height: 40,
              transform: [{ translateX: -20 }],
            })}
          />

          <View
            style={tw.style(`absolute rounded-full bg-lightgrey `, {
              right: 0,
              bottom: 60,
              width: 40,
              height: 40,
              transform: [{ translateX: 20 }],
            })}
          />
          <View
            style={tw.style('bg-brand rounded-full bg-opacity-10 center', {
              height: 120,
              width: 120,
              top: 0,
              transform: [{ translateY: -60 }],
              position: 'absolute',
            })}
          >
            <View style={tw`w-[80%] h-[80%] bg-brand rounded-full center`}>
              <Ionicons
                name="checkmark"
                color="white"
                size={42}
                style={tw`font-bold`}
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={tw`flex flex-row bg-white justify-between px-global shadow-md`}
      >
        <TouchableOpacity
          style={tw`bg-accent w-full center rounded-2 py-4 my-2`}
        >
          <Text style={tw` text-white body2 font-bold tracking-wide`}>
            View Map
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;
