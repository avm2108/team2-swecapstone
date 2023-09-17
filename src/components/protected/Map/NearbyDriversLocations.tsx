/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';

export function NearbyDriversLocations() {
  const drivers = useSelector(state => {
    // @ts-ignore
    return state?.drivers?.drivers;
  });
  console.log(
    '🚀 ~ file: NearbyDriversLocations.tsx:9 ~ drivers ~ drivers:',
    drivers,
  );
  return drivers?.providers?.map((driver: any, index: number) => {
    return (
      <Marker
        key={index}
        coordinate={{
          latitude: driver?.providerLocation?.[0],
          longitude: driver?.providerLocation?.[1],
        }}
        title="Source"
        description="Source Location">
        <Image
          source={{uri: 'https://staging.ohmelogistics.com/map_pin/driver.png'}}
          style={{width: 27, height: 40}}
        />
      </Marker>
    );
  });
}
