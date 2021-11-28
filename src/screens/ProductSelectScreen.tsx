import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import InputHeader from '../components/InputHeader';
import ProductSelectItem from '../components/ProductSelectItem';
import {Surface} from 'react-native-paper';
import useNav from '../hooks/useNav';
import ProductSearchStore from '../stores/transient/ProductSearchStore';
import AsyncWrapper from '../components/AsyncWrapper';
import NoItemsBlock from '../components/NoItemsBlock';
import {ProductTypeDto} from '../api/src';
import {observer} from 'mobx-react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    flex: 1,
    paddingTop: 48,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatlistContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
});

function key(item: {a: ProductTypeDto; b?: ProductTypeDto}): string {
  return item.a.id.toString(10);
}

const ProductSelectScreen: React.FunctionComponent = () => {
  const nav = useNav();
  const store = useMemo(() => new ProductSearchStore(), []);
  const renderItem = useCallback(
    (item: ListRenderItemInfo<{a: ProductTypeDto; b?: ProductTypeDto}>) => {
      let b = item.item.b;
      return (
        <View style={styles.itemRow}>
          <ProductSelectItem
            image={item.item.a.picture}
            name={item.item.a.name}
            onPress={() => nav.navigate('ProductInfo', {type: item.item.a})}
          />
          {b && (
            <ProductSelectItem
              image={b.picture}
              name={b.name}
              onPress={() => nav.navigate('ProductInfo', {type: b!})}
            />
          )}
        </View>
      );
    },
    [nav],
  );
  return (
    <View style={styles.container}>
      <InputHeader value={store.input} onChangeText={store.setInput} />
      <Surface style={styles.resultContainer}>
        <AsyncWrapper state={store.sortedItems}>
          {(state) =>
            state.length > 0 ? (
              <FlatList
                contentContainerStyle={styles.flatlistContent}
                data={state}
                renderItem={renderItem}
                keyExtractor={key}
              />
            ) : (
              <NoItemsBlock
                icon={'magnify'}
                title={{
                  id: 'screens.ProductSelectScreen.noItems',
                  defaultMessage: 'Продукт не найден',
                }}
                text={{
                  id: 'screens.ProductSelectScreen.noItemsText',
                  defaultMessage: 'Попытайтесь найти другой продукт',
                }}
              />
            )
          }
        </AsyncWrapper>
      </Surface>
    </View>
  );
};

export default observer(ProductSelectScreen);
