import React, {useMemo} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Input from '../components/Input';
import Button from '../components/Button';
import {FormattedMessage} from 'react-intl';
import RegisterStore from '../stores/transient/RegisterStore';
import useNav from '../hooks/useNav';
import {observer} from 'mobx-react';
import Header from '../components/Header';

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
    marginBottom: 32,
    marginTop: 16,
  },
  form: {
    flex: 1,
  },
  space: {
    height: 24,
  },
});

const RegisterScreen: React.FunctionComponent = () => {
  const nav = useNav();
  const store = useMemo(() => new RegisterStore(), []);
  if (store.state.status === 'success') {
    store.clearRegistrationState();
    nav.popToTop();
    nav.replace('Orders');
  }
  if (store.state.status === 'error') {
    console.log(store.state.error);
  }
  return (
    <View style={styles.container}>
      <Header
        title={{
          id: 'screens.RegisterScreen.title',
          defaultMessage: 'Регистрация',
        }}
      />
      <View style={styles.formContainer}>
        <ScrollView style={styles.form}>
          <Input
            title={{id: 'email', defaultMessage: 'E-Mail'}}
            value={store.email}
            onTextChange={store.setEmail}
          />
          <View style={styles.space} />
          <Input
            title={{id: 'password', defaultMessage: 'Пароль'}}
            value={store.password}
            onTextChange={store.setPassword}
            secureTextEntry
          />
          <View style={styles.space} />
          <Input
            title={{id: 'name', defaultMessage: 'Имя'}}
            value={store.name}
            onTextChange={store.setName}
          />
          <View style={styles.space} />
          <Input
            title={{id: 'address', defaultMessage: 'Адрес'}}
            onPressIn={() =>
              nav.navigate('AddressSelect', {callback: store.setAddress})
            }
            value={store.address}
            onTextChange={() => {}}
          />
        </ScrollView>
        <Button
          type={'primary'}
          loading={store.state.status === 'loading'}
          onPress={store.register}>
          <FormattedMessage
            id={'screens.LoginTab.register'}
            defaultMessage={'Зарегистрироваться'}
          />
        </Button>
      </View>
    </View>
  );
};

export default observer(RegisterScreen);
