import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {FormattedMessage} from 'react-intl';

interface Props {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    height: 96,
    width: '100%',
    borderRadius: 8,
    borderWidth: 3,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  plus: {
    fontSize: 48,
    marginRight: 32,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const CartAddButton: React.FunctionComponent<Props> = ({onPress, style}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.container, {borderColor: theme.colors.accent}, style]}>
        <Text style={[styles.plus, {color: theme.colors.accent}]}>+</Text>
        <Text style={[styles.text, {color: theme.colors.accent}]}>
          <FormattedMessage
            id={'components.CartAddButton.add'}
            defaultMessage={'Добавить товар'}
          />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartAddButton;
