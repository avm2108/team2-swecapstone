/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default function Button({
  onPress = () => {},
  wrapperStyle = {},
  title = '',
  textStyles = {},
  processing = false,
  disabled = false,
  ...rest
}) {
  const disableButton = React.useMemo(() => {
    return processing || disabled;
  }, [processing, disabled]);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: disableButton
          ? '#efefef'
          : rest.color || 'transparent',
        overflow: 'hidden',
        borderRadius: 5,
        padding: 12,
        ...wrapperStyle,
      }}
      disabled={disableButton}
      onPress={onPress}
      // title={title}
      {...rest}>
      <Text
        style={{
          textAlign: 'center',
          color: disableButton ? 'black' : 'white',
          fontSize: 16,
          fontWeight: '600',
          ...textStyles,
        }}>
        {processing ? 'Processing...' : title}
      </Text>
      {/* <RNButton/> */}
    </TouchableOpacity>
  );
}
