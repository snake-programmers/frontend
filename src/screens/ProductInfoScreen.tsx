import React, {useMemo} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {Text, useTheme} from 'react-native-paper';
import RadioGroup from '../components/RadioGroup';
import Button from '../components/Button';
import {FormattedMessage} from 'react-intl';
import {RouteProp, StackActions, useRoute} from '@react-navigation/native';
import {NavParams} from './Navigator';
import {observer} from 'mobx-react';
import SelectProductStore from '../stores/transient/SelectProductStore';
import AsyncWrapper from '../components/AsyncWrapper';
import Input from '../components/Input';
import useNav from '../hooks/useNav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.45,
    borderRadius: (Dimensions.get('window').width * 0.45) / 2,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  price: {
    fontSize: 20,
    lineHeight: 22,
    marginVertical: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  magazContainer: {
    paddingHorizontal: 32,
    flex: 1,
  },
  magaz: {
    marginTop: 6,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  magazScroll: {
    maxHeight: Dimensions.get('window').height * 0.3,
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  countFieldContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  countText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
  },
  countInput: {
    height: 22,
    marginLeft: 8,
    minWidth: Dimensions.get('window').width * 0.45,
  },
  countVolume: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
  },
});

const ProductInfoScreen: React.FunctionComponent = () => {
  const nav = useNav();
  const route = useRoute<RouteProp<NavParams, 'ProductInfo'>>();
  const store = useMemo(
    () => new SelectProductStore(route.params.type),
    [route.params.type],
  );
  return (
    <View style={styles.container}>
      <Header
        title={{
          id: 'screens.ProductInfoScreen.title',
          defaultMessage: 'Продукт',
        }}
      />
      <Image
        style={styles.image}
        source={{
          uri: route.params.type.picture,
        }}
      />
      <Text style={styles.title}>{route.params.type.name}</Text>
      <View style={styles.magazContainer}>
        <Text style={styles.magaz}>Доступны в магазинах</Text>
        <AsyncWrapper state={store.data}>
          {() => (
            <ScrollView style={styles.magazScroll}>
              <RadioGroup
                values={store.selectData}
                selected={store.selectedKey}
                onSelect={store.select}
              />
            </ScrollView>
          )}
        </AsyncWrapper>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.countFieldContainer}>
          <Text style={styles.countText}>
            <FormattedMessage
              id={'screens.ProductInfoScreen.amount'}
              defaultMessage={'Количество:'}
            />
          </Text>
          <Input
            style={styles.countInput}
            value={store.count.value}
            onTextChange={store.setCount}
            error={store.count.error ? 'Не число' : undefined}
          />
          <Text style={styles.countVolume}>
            {route.params.type.humanVolume}
          </Text>
        </View>
        <Button
          type={'primary'}
          disabled={store.data.status !== 'success' || store.count.error}
          onPress={() => {
            store.add();
            nav.dispatch(StackActions.pop(2));
          }}>
          <FormattedMessage
            id={'screens.ProductInfoScreen.add'}
            defaultMessage={'Добавить в корзину'}
          />
        </Button>
      </View>
    </View>
  );
};

export default observer(ProductInfoScreen);
