/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import {STYLES} from '../../constants/styles';
import React from 'react';

export function Card({children, style}: any) {
  return (
    <View
      style={{
        borderColor: STYLES.lightGreenColor,
        borderWidth: 1,
        borderRadius: 4,
        ...style,
      }}>
      {children}
    </View>
  );
}
