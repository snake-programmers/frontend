import React from 'react';
import Card from './Card';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {observer} from "mobx-react";

interface Props {
  icon: string;
  title: string;
  amount: number;
  price: string;
  onChange: (target: number) => void;
  onDelete: () => void;
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  image: {
    height: 96,
    width: 96,
    marginLeft: -16,
    marginVertical: -16,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    marginRight: 16,
  },
  amountContainer: {
    position: 'absolute',
    right: 16,
    bottom: 8,
    flexDirection: 'row',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  minus: {
    marginRight: 8,
  },
  plus: {
    marginLeft: 8,
  },
  close: {
    position: 'absolute',
    right: 16,
    top: 8,
  },
  mainContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  title: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
  },
});

const CartItem: React.FunctionComponent<Props> = ({
  icon,
  title,
  amount,
  price,
  onChange,
  onDelete,
}) => {
  const theme = useTheme();
  return (
    <Card style={styles.card}>
      <View style={styles.mainContainer}>
        <Image source={{uri: icon}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text style={[{color: theme.colors.accent}, styles.price]}>
            {price}
          </Text>
        </View>
      </View>
      <View
        style={[
          {backgroundColor: theme.colors.accent},
          styles.amountContainer,
        ]}>
        <TouchableOpacity onPress={() => onChange(amount - 1)}>
          <Text style={[{color: theme.colors.surface}, styles.minus]}>-</Text>
        </TouchableOpacity>
        <Text style={{color: theme.colors.surface}}>
          {amount >= 100 ? '99+' : amount}
        </Text>
        <TouchableOpacity onPress={() => onChange(amount + 1)}>
          <Text style={[{color: theme.colors.surface}, styles.plus]}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.close}>
        <Icon name={'close'} size={20} color={theme.colors.accent} />
      </TouchableOpacity>
    </Card>
  );
};

export default observer(CartItem);
