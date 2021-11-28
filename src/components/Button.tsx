import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';
import Colors from '../manager/Colors';

interface Props {
  type: 'link' | 'primary' | 'secondary';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
}

const styles = StyleSheet.create({
  link: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  secondary: {
    height: 40,
    marginBottom: 8,
    textAlignVertical: 'bottom',
  },
  secondaryIos: {
    marginTop: 24,
    height: 18,
  },
  primaryContainer: {
    borderRadius: 24,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  primaryText: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20,
    textAlign: 'center',
    color: 'white',
  },
});

const Button: React.FunctionComponent<Props> = ({
  type,
  children,
  onPress,
  style,
  disabled,
  error,
  loading,
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled || loading}>
      {type === 'link' && (
        <Text
          style={[
            styles.link,
            {
              color: theme.colors.accent,
              textDecorationColor: theme.colors.accent,
            },
            style,
          ]}>
          {children}
        </Text>
      )}
      {type === 'secondary' && (
        <Text
          style={[
            styles.link,
            styles.secondary,
            Platform.OS === 'ios' && styles.secondaryIos,
            {
              color: theme.colors.accent,
              textDecorationColor: theme.colors.accent,
            },
            style,
          ]}>
          {children}
        </Text>
      )}
      {type === 'primary' && (
        <View
          style={[
            styles.primaryContainer,
            {
              backgroundColor: disabled
                ? Colors.getGreyColor(theme)
                : error
                ? theme.colors.error
                : theme.colors.accent,
            },
            style,
          ]}>
          {loading ? (
            <ActivityIndicator
              animating
              color={theme.colors.background}
              size={20}
            />
          ) : (
            <Text style={styles.primaryText} numberOfLines={1}>
              {children}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
