import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Input from '../components/Input';
import Button from '../components/Button';
import {FormattedMessage} from 'react-intl';
import LoginStore from '../stores/transient/LoginStore';
import useNav from '../hooks/useNav';
import {observer} from 'mobx-react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Dimensions.get('window').height * 0.1,
  },
  tabbar: {
    position: 'absolute',
    left: 32,
    right: 32,
    zIndex: 10,
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 32,
    marginTop: 48,
    marginBottom: 32,
  },
  form: {
    flex: 1,
  },
  space: {
    height: 24,
  },
});

const LoginScreen: React.FunctionComponent = () => {
  const store = useMemo(() => new LoginStore(), []);
  const nav = useNav();
  if (store.state.status === 'success') {
    store.resetStatus();
    nav.replace('Orders');
  }
  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Input
            title={{id: 'email', defaultMessage: 'E-Mail'}}
            value={store.login}
            onTextChange={store.setLogin}
          />
          <View style={styles.space} />
          <Input
            title={{id: 'password', defaultMessage: 'Пароль'}}
            value={store.password}
            onTextChange={store.setPassword}
            error={
              store.state.status === 'error' ? 'Пароль неверен' : undefined
            }
            secureTextEntry
          />
        </View>
        <Button type={'primary'} onPress={store.makeLogin}>
          <FormattedMessage
            id={'screens.LoginTab.login'}
            defaultMessage={'Войти'}
          />
        </Button>
        <Button type={'secondary'} onPress={() => nav.navigate('Register')}>
          <FormattedMessage
            id={'screens.LoginTab.register'}
            defaultMessage={'Зарегистрироваться'}
          />
        </Button>
      </View>
    </View>
  );
};

export default observer(LoginScreen);
