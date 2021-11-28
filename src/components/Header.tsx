import React from 'react';
import {MessageDescriptor, useIntl} from 'react-intl';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import useNav from '../hooks/useNav';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  title: MessageDescriptor;
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
});

const Header: React.FunctionComponent<Props> = ({title}) => {
  const intl = useIntl();
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
      <Text style={styles.title}>{intl.formatMessage(title)}</Text>
      <View style={styles.stub} />
    </View>
  );
};

export default Header;
