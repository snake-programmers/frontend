import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import CartAddButton from '../components/CartAddButton';
import Button from '../components/Button';
import {FormattedMessage} from 'react-intl';
import {Form} from 'formik';
import Card from '../components/Card';
import RadioGroup from '../components/RadioGroup';
import useNav from '../hooks/useNav';
import DeliveryStore from '../stores/transient/DeliveryStore';
import AsyncWrapper from '../components/AsyncWrapper';
import {observer} from 'mobx-react';
import stores from "../stores";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  title: {
    marginVertical: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
  noItemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -68,
    paddingHorizontal: 32,
  },
  noItemsText: {
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
  },
  totalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 96,
  },
});

const DeliveryScreen: React.FunctionComponent = () => {
  const nav = useNav();
  const store = useMemo(() => new DeliveryStore(), []);
  return (
    <View style={styles.container}>
      <Header
        title={{id: 'screens.DeliveryScreen.title', defaultMessage: 'Доставка'}}
      />
      <Text style={styles.title}>
        <FormattedMessage
          id={'screens.DeliveryScreen.addressDetails'}
          defaultMessage={'Адрес доставки'}
        />
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          nav.navigate('AddressSelect', {callback: store.setAddress})
        }>
        <Card>
          <Text>{store.address.name}</Text>
        </Card>
      </TouchableOpacity>
      <Text style={styles.title}>
        <FormattedMessage
          id={'screens.DeliveryScreen.deliveryService'}
          defaultMessage={'Способ доставки'}
        />
      </Text>
      <AsyncWrapper state={store.procData}>
        {(d) => (
          <RadioGroup
            values={d}
            selected={store.selected}
            onSelect={store.onSelect}
          />
        )}
      </AsyncWrapper>
      <View style={styles.totalContainer}>
        <Text style={styles.title}>
          <FormattedMessage
            id={'screens.CartScreen.total'}
            defaultMessage={'Всего'}
          />
        </Text>
        <Text style={styles.title}>{store.total}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button type={'primary'} onPress={() => store.addOrder().then(() => nav.pop(2))}>
          <FormattedMessage
            id={'screens.CartScreen.newOrder'}
            defaultMessage={'Создать заказ'}
          />
        </Button>
      </View>
    </View>
  );
};

export default observer(DeliveryScreen);
