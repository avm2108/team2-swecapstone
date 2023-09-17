/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {Marker, Polyline} from 'react-native-maps';

export const PathFromSourceToDestination = ({
  origin,
  destination,
  waypoints,
}: any) => {
  return (
    <>
      <Marker coordinate={origin} title="Source" description="Source Location">
        <Image
          source={{
            uri: 'https://staging.ohmelogistics.com/map_pin/pickup.png',
          }}
          style={{width: 27, height: 40}}
        />
      </Marker>
      <Polyline coordinates={waypoints} strokeWidth={4} strokeColor="blue" />
      <Marker
        coordinate={destination}
        title="Destination"
        description="Destination Location">
        <Image
          source={{
            uri: 'https://staging.ohmelogistics.com/map_pin/destination.png',
          }}
          style={{width: 27, height: 40}}
        />
      </Marker>
    </>
  );
};
