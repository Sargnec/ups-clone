import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card, Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn/dist';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';

type Props = {
  item: Order;
};

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrderCard = ({ item }: Props) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Order', { order: item })}
    >
      <Card
        containerStyle={tw(
          'px-5 rounded-lg border-r-4 border-b-4 border-l-2 border-t-2 border-black '
        )}
      >
        <View style={tw('flex-row justify-between items-center')}>
          <View>
            <Icon
              name='truck-delivery'
              color='#625B1F'
              type='material-community'
            />
            <Text style={{ fontSize: 10 }}>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>

          <View>
            <Text style={[tw('text-gray-400'), { fontSize: 10 }]}>
              {item.carrier} - {item.trackingId}
            </Text>
            <Text style={tw('text-gray-500 text-xl')}>
              {item.trackingItems.customer.name}
            </Text>
          </View>

          <View style={tw('flex-row items-center')}>
            <Text style={[tw('text-sm'), { color: '#625b1f' }]}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon
              name='box'
              style={tw('ml-2')}
              color='#625B1F'
              type='feather'
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
