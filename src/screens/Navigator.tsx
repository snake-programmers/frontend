import React, {useEffect, useState} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import {View, Platform, StyleSheet} from 'react-native';
import Sentry from '../manager/Sentry';
import {useTheme} from 'react-native-paper';
import LoginScreen from './LoginScreen';
import OrdersScreen from './OrdersScreen';
import CartScreen from './CartScreen';
import DeliveryScreen from './DeliveryScreen';
import ProductSelectScreen from './ProductSelectScreen';
import ProductInfoScreen from './ProductInfoScreen';
import AddressSelectScreen from './AddressSelectScreen';
import {AddressDto, ProductTypeDto} from '../api/src';
import RegisterScreen from './RegisterScreen';
import stores from '../stores';

export type NavParams = {
  Login: undefined;
  Register: undefined;
  Orders: undefined;
  Cart: undefined;
  Delivery: undefined;
  ProductSelect: undefined;
  ProductInfo: {type: ProductTypeDto};
  AddressSelect: {callback: (address: AddressDto) => void};
};

const styles = StyleSheet.create({
  headerBackgroundIos: {
    zIndex: 10,
    flex: 1,
  },
});

const Nav = createStackNavigator<NavParams>();

const Navigator: React.FunctionComponent = () => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState<'Login' | 'Orders' | undefined>(
    undefined,
  );
  useEffect(() => {
    stores.auth.init().then((value) => setLoaded(value ? 'Orders' : 'Login'));
  }, []);
  return loaded ? (
    <Nav.Navigator
      initialRouteName={loaded}
      screenOptions={{
        cardStyle: {paddingTop: Platform.OS === 'ios' ? 16 : 0},
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerBackground:
          Platform.OS === 'ios'
            ? (props) => (
                <View
                  style={[
                    props.style,
                    styles.headerBackgroundIos,
                    {
                      backgroundColor: theme.colors.surface,
                    },
                  ]}
                />
              )
            : undefined,
        headerTransparent: Platform.OS === 'ios',
      }}>
      <Nav.Screen
        name={'Login'}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Nav.Screen
        name={'Register'}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Nav.Screen
        name={'Orders'}
        component={OrdersScreen}
        options={{headerShown: false}}
      />
      <Nav.Screen
        name={'Cart'}
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Nav.Screen
        name={'Delivery'}
        component={DeliveryScreen}
        options={{headerShown: false}}
      />
      <Nav.Screen
        name={'ProductSelect'}
        component={ProductSelectScreen}
        options={{headerShown: false}}
      />
      <Nav.Screen
        name={'ProductInfo'}
        component={ProductInfoScreen}
        options={{headerShown: false}}
      />
      <Nav.Screen
        name={'AddressSelect'}
        component={AddressSelectScreen}
        options={{headerShown: false}}
      />
    </Nav.Navigator>
  ) : (
    <View />
  );
};

export default Sentry.wrapInit(Navigator);
