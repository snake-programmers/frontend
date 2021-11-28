import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import InputHeader from '../components/InputHeader';
import {Surface, Text} from 'react-native-paper';
import AddressSearchStore from '../stores/transient/AddressSearchStore';
import {observer} from 'mobx-react';
import AsyncWrapper from '../components/AsyncWrapper';
import {AddressDto} from '../api/src';
import NoItemsBlock from '../components/NoItemsBlock';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NavParams} from './Navigator';
import useNav from "../hooks/useNav";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 48,
  },
  item: {
    borderBottomWidth: 1,
    paddingVertical: 16,
    marginRight: -32,
    marginLeft: -32,
    paddingLeft: 32,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

function key(dto: AddressDto): string {
  return dto.name;
}

const AddressSelectScreen: React.FunctionComponent = () => {
  const nav = useNav();
  const route = useRoute<RouteProp<NavParams, 'AddressSelect'>>();
  const store = useMemo(() => new AddressSearchStore(), []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<AddressDto>) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          route.params.callback(info.item);
          nav.goBack();
        }}>
        <Text style={[styles.item]}>{info.item.name}</Text>
      </TouchableOpacity>
    ),
    [nav, route.params],
  );
  return (
    <View style={styles.container}>
      <InputHeader value={store.input} onChangeText={store.setInput} />
      <Surface style={styles.resultContainer}>
        <AsyncWrapper state={store.items}>
          {(state) =>
            state.length > 0 ? (
              <FlatList
                data={state}
                renderItem={renderItem}
                keyExtractor={key}
              />
            ) : (
              <NoItemsBlock
                icon={'magnify'}
                title={{
                  id: 'screens.AddressSelectScreen.noItems',
                  defaultMessage: 'Адрес не найден',
                }}
                text={{
                  id: 'screens.AddressSelectScreen.noItemsText',
                  defaultMessage: 'Введите корректный адрес',
                }}
              />
            )
          }
        </AsyncWrapper>
      </Surface>
    </View>
  );
};

export default observer(AddressSelectScreen);
