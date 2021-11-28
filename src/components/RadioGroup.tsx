import React from 'react';
import Card from './Card';
import {Caption, Checkbox, RadioButton, Text, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../manager/Colors';
import {observer} from "mobx-react";

interface Props {
  values: {text: string; key: number; value: unknown, description?: string}[];
  selected: number;
  onSelect: (value: unknown) => void;
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
  },
});

const RadioGroup: React.FunctionComponent<Props> = ({
  values,
  selected,
  onSelect,
}) => {
  const theme = useTheme();
  return (
    <Card style={styles.card}>
      {values.map((value, idx) => (
        <TouchableOpacity
          onPress={() => onSelect(value.value)}
          activeOpacity={0.6}>
          <View
            key={value.key}
            style={[
              styles.row,
              idx < values.length - 1 && styles.rowBorder,
              {borderColor: Colors.getLightGreyColor(theme)},
            ]}>
            <RadioButton
              status={value.key === selected ? 'checked' : 'unchecked'}
              onPress={() => onSelect(value.value)}
              value={value.text}
            />
            <View>
              <Text>{value.text}</Text>
              {value.description && <Caption>{value.description}</Caption>}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </Card>
  );
};

export default observer(RadioGroup);
