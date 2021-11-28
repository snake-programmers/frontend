import React, {useCallback} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {FormattedMessage} from 'react-intl';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import CartAddButton from '../components/CartAddButton';
import useNav from '../hooks/useNav';
import OrderStore, {CardItemDto} from '../stores/OrderStore';
import {inject, observer} from 'mobx-react';
import NoItemsBlock from '../components/NoItemsBlock';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  addBtnNotFound: {
    marginTop: 16,
    height: 72,
  },
  addBtnFound: {
    marginBottom: 128,
  },
  flatlist: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});

interface Props {
  order: OrderStore;
}

const CartScreen: React.FunctionComponent<Props> = ({order}) => {
  const nav = useNav();
  const renderItem = useCallback(
    (info: ListRenderItemInfo<CardItemDto | 'end'>) =>
      info.item === 'end' ? (
        <CartAddButton
          onPress={() => nav.navigate('ProductSelect')}
          style={styles.addBtnFound}
        />
      ) : (
        <CartItem
          icon={info.item.type.picture}
          title={info.item.type.name}
          amount={info.item.amount}
          price={`${info.item.product.price / 100} ₽/${
            info.item.type.humanVolume
          }`}
          onChange={(n) => order.changeAmount(info.item as CardItemDto, n)}
          onDelete={() => order.deleteItem(info.item as CardItemDto)}
        />
      ),
    [nav, order],
  );
  return (
    <View style={styles.container}>
      <Header
        title={{id: 'screens.OrdersScreen.title', defaultMessage: 'Корзина'}}
      />
      {order.card.length === 0 ? (
        <NoItemsBlock
          icon={'cart-outline'}
          title={{
            id: 'screens.CartScreen.noItems',
            defaultMessage: 'Козина пуста',
          }}
          text={{
            id: 'screens.CartScreen.noItemsText',
            defaultMessage: 'Добавьте продукты в корзину с помощью кнопки ниже',
          }}>
          <CartAddButton
            onPress={() => nav.navigate('ProductSelect')}
            style={styles.addBtnNotFound}
          />
        </NoItemsBlock>
      ) : (
        <FlatList
          data={order.cardWithEnd}
          renderItem={renderItem}
          style={styles.flatlist}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          type={'primary'}
          onPress={() => nav.navigate('Delivery')}
          disabled={order.card.length === 0}>
          <FormattedMessage
            id={'screens.CartScreen.newOrder'}
            defaultMessage={'Создать заказ'}
          />
        </Button>
      </View>
    </View>
  );
};

export default inject('order')(observer(CartScreen));
