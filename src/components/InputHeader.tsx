import React, {useEffect} from 'react';
import {MessageDescriptor, useIntl} from 'react-intl';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import useNav from '../hooks/useNav';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from './Input';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  stub: {
    width: 32,
    height: 32,
  },
  input: {
    width: Dimensions.get('window').width * 0.6,
    height: 56,
  },
});

const InputHeader: React.FunctionComponent<Props> = ({onChangeText, value}) => {
  const nav = useNav();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {nav.canGoBack() ? (
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Icon name={'chevron-left'} size={32} color={theme.colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.stub} />
      )}
      <Input
        value={value}
        onTextChange={onChangeText}
        autofocus
        style={styles.input}
      />
      <View style={styles.stub} />
    </View>
  );
};

export default InputHeader;
