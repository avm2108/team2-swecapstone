/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TextInput, Text, View} from 'react-native';

export default function InputField({
  label = '',
  value = '',
  onChange = () => {},
  errorComponent = <></>,
  leftIcon = <></>,
  rightIcon = <></>,
  labelStyles = {},
  inputWrapperStyle = {},
  inputBoxContainerStyle = {},
  errorMessageStyle = {},
  placeholderTextColor = 'gray',
  ...rest
}) {
  return (
    <View style={{...inputWrapperStyle}}>
      {label && typeof label === 'string' ? (
        <Text style={{color: 'black', paddingBottom: 5, ...labelStyles}}>
          {label}
        </Text>
      ) : (
        label
      )}

      <View style={[styles.inputContainer, inputBoxContainerStyle]}>
        {leftIcon}
        <TextInput
          value={value}
          onChange={onChange}
          placeholderTextColor={placeholderTextColor}
          {...rest}
        />
        {rightIcon}
      </View>
      <View style={[errorMessageStyle]}>{errorComponent}</View>
    </View>
  );
}

const styles = {
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
};
