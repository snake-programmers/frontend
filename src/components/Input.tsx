import React, {useEffect, useRef} from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Text, useTheme, TextInput} from 'react-native-paper';
import {MessageDescriptor, useIntl} from 'react-intl';

interface Props {
  style?: StyleProp<ViewStyle>;
  title?: MessageDescriptor;
  error?: React.ReactNode | string;
  keyboardType?: KeyboardTypeOptions;
  value: string | undefined;
  onTextChange: (text: string) => void;
  onBlur?: () => void;
  autofocus?: boolean;
  secureTextEntry?: boolean;
  onPressIn?: () => void;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});

const Input: React.FunctionComponent<Props> = ({onBlur, ...props}) => {
  const theme = useTheme();
  const intl = useIntl();
  const ref = useRef<typeof TextInput>();
  useEffect(() => {
    if (props.autofocus) {
      ref.current?.focus();
    }
  }, [props.autofocus]);
  return (
    <View>
      <TextInput
        onPressIn={props.onPressIn}
        style={[styles.input, props.style]}
        value={props.value}
        onChangeText={props.onTextChange}
        onBlur={onBlur}
        label={props.title ? intl.formatMessage(props.title) : undefined}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        ref={ref}
      />
      {props.error && (
        <Text style={[styles.error, {color: theme.colors.error}]}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

export default React.memo(Input);
