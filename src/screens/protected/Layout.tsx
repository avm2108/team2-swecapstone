/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, View} from 'react-native';
import {STYLES} from '../../constants/styles';
import React from 'react';
import {HamburgerIcon, ScooperLogoMedium} from '../../svgs';
import {DrawerActions} from '@react-navigation/native';
import ProtectedWrapper from '../../components/hoc/ProtectedWrapper';
import Icon from 'react-native-vector-icons/Feather';

export function Layout({children = <></>, navigation, backIcon = false}: any) {
  const handleGoBack = () => {
    navigation.replace('Protected');
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          paddingHorizontal: 27,
          backgroundColor: STYLES.baseColor,
          alignItems: 'center',
        }}>
        {backIcon === false ? (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
              style={{
                flex: 0.5 / 3,
                paddingVertical: 31,
              }}>
              <HamburgerIcon />
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                flex: 2 / 3,
              }}>
              <ScooperLogoMedium />
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleGoBack}
              style={{
                flex: 0.5 / 3,
                paddingVertical: 31,
              }}>
              <Icon name="arrow-left" size={25} color="black" />
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                flex: 2 / 3,
              }}>
              <ScooperLogoMedium />
            </View>
          </>
        )}
      </View>
      <ProtectedWrapper>{children}</ProtectedWrapper>
    </>
  );
}
