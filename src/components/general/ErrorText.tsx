import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const ErrorText = ({errorText = ''}) => {
  return <Text style={styles.errorText}>{errorText}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 8,
    zIndex: -1,
  },
});
