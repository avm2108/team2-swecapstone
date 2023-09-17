/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SKELETON_SPEED = 1500;
export const SKELETON_BG = '#dddddd';
export const SKELETON_HIGHLIGHT = '#e7e7e7';
export const MAX_RATING_DEVIATION = 200;
const windowWidth = Dimensions.get('window').width * 0.65;

export const SkeletonItem: React.FC = () => (
  <View style={{flex: 1, marginHorizontal: 'auto', marginTop: 24}}>
    <SkeletonPlaceholder
      speed={SKELETON_SPEED}
      backgroundColor={SKELETON_BG}
      highlightColor={SKELETON_HIGHLIGHT}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}>
        <View
          style={{width: 50, height: 50, marginTop: -10, borderRadius: 25}}
        />
        <View style={{marginLeft: 10, marginTop: 12}}>
          <View style={{width: windowWidth, height: 20, borderRadius: 10}} />
          <View
            style={{
              marginTop: 6,
              marginBottom: 12,
              width: windowWidth,
              height: 20,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  </View>
);
