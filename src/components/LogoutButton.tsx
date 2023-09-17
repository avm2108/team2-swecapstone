import React, {FunctionComponent} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose a different icon library if you prefer

interface LogoutButtonProps {
  onPress: () => void;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export const LogoutButton: FunctionComponent<LogoutButtonProps> = ({
  onPress,
  wrapperStyle = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={wrapperStyle}>
      <Icon name="sign-out" size={30} color="red" />
      {/* Adjust size and color as needed */}
    </TouchableOpacity>
  );
};
