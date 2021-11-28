import React from 'react';
import Card from './Card';
import {Caption, Text, useTheme} from 'react-native-paper';
import {FormattedMessage} from 'react-intl';
import {StyleSheet} from 'react-native';
import Colors from "../manager/Colors";

interface Props {
  id: number;
  status: string;
  inDelivery: boolean;
  itemsCount: number;
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  number: {
    marginBottom: 0,
    lineHeight: 14,
    fontSize: 12,
  },
});

const OrderItem: React.FunctionComponent<Props> = ({
  id,
  status,
  itemsCount,
  inDelivery,
}) => {
  const theme = useTheme();
  return (
    <Card style={styles.card}>
      <Text style={[styles.number, {color: Colors.getGreyColor(theme)}]}>
        <FormattedMessage
          id={'components.OrderItem.id'}
          defaultMessage={'Заказ № {id}'}
          values={{id}}
        />
      </Text>
      <Text
        style={[
          styles.status,
          {color: inDelivery ? theme.colors.accent : theme.colors.text},
        ]}>
        {status}
      </Text>
      <Text>
        <FormattedMessage
          id={'components.OrderItem.itemsCount'}
          defaultMessage={'Количество позиций - {itemsCount}'}
          values={{itemsCount}}
        />
      </Text>
    </Card>
  );
};

export default OrderItem;
