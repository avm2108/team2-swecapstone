import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function LinearGradientBase({...props}) {
  return (
    <LinearGradient
      colors={
        props?.colors && props?.colors?.length > 0
          ? [...props.colors]?.reverse()
          : ['#3F76FF', '#003AC9']?.reverse()
      }
      start={props.start ? props.start : {x: 0.0, y: 1.0}}
      end={props.end ? props.end : {x: 1.0, y: 1.0}}
      style={{
        ...(props?.linearGradientContainerStyle
          ? props?.linearGradientContainerStyle
          : {}),
      }}>
      {props.children}
    </LinearGradient>
  );
}
