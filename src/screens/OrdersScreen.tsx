import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {FormattedMessage} from 'react-intl';
import Button from '../components/Button';
import OrderItem from '../components/OrderItem';
import useNav from '../hooks/useNav';
import NoItemsBlock from '../components/NoItemsBlock';
import OrderStore from '../stores/OrderStore';
import {inject, observer} from 'mobx-react';
import AsyncWrapper from '../components/AsyncWrapper';
import {OrderDto} from '../api/src';

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
  list: {
    paddingHorizontal: 32,
  },
});

interface Props {
  order: OrderStore;
}

function renderItem(info: ListRenderItemInfo<OrderDto>): React.ReactElement {
  return (
    <OrderItem
      id={info.item.id}
      status={info.item.status}
      inDelivery={info.item.status !== 'Выполнен'}
      itemsCount={info.item.count!}
    />
  );
}

function key(order: OrderDto): string {
  return order.id.toString(10);
}

const OrdersScreen: React.FunctionComponent<Props> = ({order}) => {
  const nav = useNav();
  return (
    <View style={styles.container}>
      <Header
        title={{id: 'screens.OrderScreen.title', defaultMessage: 'Заказы'}}
      />
      <AsyncWrapper state={order.orders}>
        {(state) =>
          state.length === 0 ? (
            <NoItemsBlock
              icon={'calendar-text-outline'}
              title={{
                id: 'screens.OrdersScreen.noOrders',
                defaultMessage: 'Ещё нет заказов',
              }}
              text={{
                id: 'screens.OrdersScreen.noOrdersText',
                defaultMessage:
                  'Нажмите кнопку ниже, чтобы создать ваш первый заказ',
              }}
            />
          ) : (
            <FlatList
              data={state}
              renderItem={renderItem}
              keyExtractor={key}
              style={styles.list}
            />
          )
        }
      </AsyncWrapper>
      <View style={styles.buttonContainer}>
        <Button type={'primary'} onPress={() => nav.navigate('Cart')}>
          <FormattedMessage
            id={'screens.OrdersScreen.newOrder'}
            defaultMessage={'Открыть корзину'}
          />
        </Button>
      </View>
    </View>
  );
};

export default inject('order')(observer(OrdersScreen));
