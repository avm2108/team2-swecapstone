/* eslint-disable react-native/no-inline-styles */
import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {LocationFillIcon} from '../../../svgs';
import {STYLES} from '../../../constants/styles';
import {useNavigation} from '@react-navigation/native';

export const EmergencyActions = () => {
  const navigation = useNavigation();

  const handleGoToSOS = () => {
    console.log(
      '🚀 ~ file: EmergencyActions.tsx:16 ~ handleGoToSOS ~ handleGoToSOS:',
    );
    navigation.navigate('Protected', {
      screen: 'EnterSOSPIN',
    });
  };

  return (
    <View
      style={{flexDirection: 'row', gap: 8, backgroundColor: 'transparent'}}>
      <View
        style={{
          backgroundColor: STYLES.whiteColor,
          gap: 4,
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 7,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <LocationFillIcon />
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Nunito-Bold',
            color: STYLES.lightGreenColor,
          }}>
          Check In
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleGoToSOS}
        style={{
          backgroundColor: STYLES.whiteColor,
          gap: 4,
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 7,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <LocationFillIcon />
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Nunito-Bold',
            color: STYLES.lightGreenColor,
          }}>
          SOS
        </Text>
      </TouchableOpacity>
    </View>
  );
};
