import React from 'react';
import {FormattedMessage, MessageDescriptor} from 'react-intl';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../manager/Colors';
import {Text, Title, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

interface Props {
  icon: string;
  title: MessageDescriptor;
  text: MessageDescriptor;
}

const styles = StyleSheet.create({
  noItemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -68,
    paddingHorizontal: 32,
  },
  noItemsText: {
    textAlign: 'center',
  },
});

const NoItemsBlock: React.FunctionComponent<Props> = ({icon, title, text, children}) => {
  const theme = useTheme();
  return (
    <View style={styles.noItemsContainer}>
      <Icon name={icon} size={128} color={Colors.getLighterGreyColor(theme)} />
      <Title style={styles.noItemsText}>
        <FormattedMessage {...title} />
      </Title>
      <Text style={[{color: Colors.getGreyColor(theme)}, styles.noItemsText]}>
        <FormattedMessage {...text} />
      </Text>
      {children}
    </View>
  );
};

export default NoItemsBlock;
