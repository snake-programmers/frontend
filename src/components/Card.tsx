import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Surface} from 'react-native-paper';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
  },
});

const Card: React.FunctionComponent<Props> = ({style, children}) => (
  <Surface style={[styles.container, style]}>{children}</Surface>
);

export default Card;
