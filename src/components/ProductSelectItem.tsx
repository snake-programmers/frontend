import React from 'react';
import Card from './Card';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {TouchableNativeFeedback} from "react-native-gesture-handler";

interface Props {
  image: string;
  name: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    width: Dimensions.get('window').width * 0.4,
    elevation: 4,
    padding: 0,
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: Dimensions.get('window').width * 0.4,
    width: Dimensions.get('window').width * 0.4,
  },
  title: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  feedback: {
    padding: 8,
  },
});

const ProductSelectItem: React.FunctionComponent<Props> = ({
  image,
  name,
  onPress,
}) => (
  <TouchableNativeFeedback onPress={onPress} style={styles.feedback}>
    <Card style={styles.card}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
    </Card>
  </TouchableNativeFeedback>
);

export default ProductSelectItem;
