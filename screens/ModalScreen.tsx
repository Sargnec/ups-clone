import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn/dist';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TabStackParamList } from '../navigator/TabNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import useCustomerOrders from '../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';

export type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'Modal'>
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'Modal'>;
const ModalScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <View>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={tw('absolute right-5 top-5 z-10')}
      >
        <Icon name='closecircle' type='antdesign' />
      </TouchableOpacity>

      <View style={tw('mt-2')}>
        <View style={[tw('py-5 border-b'), { borderColor: '#59C1cc' }]}>
          <Text style={tw('text-center text-xl font-bold')}>{name}</Text>
          <Text style={tw('text-center italic text-sm')}>Deliveries</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={tw('pb-20')}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
