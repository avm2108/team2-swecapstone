import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface LineDividerProps {
  color?: string;
  height?: number;
  style?: ViewStyle;
}

const LineDivider: React.FC<LineDividerProps> = ({
  color = 'black',
  height = 1,
  style,
}) => {
  return (
    <View style={[styles.line, {backgroundColor: color, height}, style]} />
  );
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
  },
});

export default LineDivider;
