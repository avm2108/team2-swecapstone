/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, View} from 'react-native';
import {STYLES} from '../../constants/styles';
import React from 'react';
import {HamburgerIcon, ScooperLogoMedium} from '../../svgs';
import {DrawerActions} from '@react-navigation/native';
import ProtectedWrapper from '../../components/hoc/ProtectedWrapper';

export function Layout({children = <></>, navigation}: any) {
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
      </View>
      <ProtectedWrapper>{children}</ProtectedWrapper>
    </>
  );
}
