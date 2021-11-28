import React from 'react';
import {Caption, Text, useTheme} from 'react-native-paper';
import {FormattedMessage} from 'react-intl';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import Spinner from 'react-native-spinkit';

interface Props<T> {
  state: AsyncState<T> | RefreshableAsyncState<T>;
  children: (state: T) => React.ReactNode;
}

const styles = StyleSheet.create({
  errorText: {
    marginHorizontal: 16,
    textAlign: 'center',
  },
  loaderView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function AsyncWrapper<T>({state, children}: Props<T>): React.ReactElement {
  const theme = useTheme();
  return (
    <>
      {(state.status === 'not-requested' || state.status === 'loading') && (
        <View style={styles.loaderView}>
          <Spinner type={'Bounce'} size={96} color={theme.colors.accent} />
        </View>
      )}
      {(state.status === 'error' || state.status === 'refreshing-error') && (
        <View style={styles.loaderView}>
          <Text>
            <FormattedMessage id={'error'} defaultMessage={'Ошибка'} />
          </Text>
          <Caption style={styles.errorText}>{state.error.message}</Caption>
        </View>
      )}
      {(state.status === 'success' || state.status === 'refreshing-success') &&
        children(state.result)}
    </>
  );
}

export default observer(AsyncWrapper);
