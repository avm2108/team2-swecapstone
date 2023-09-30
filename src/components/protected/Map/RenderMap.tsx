import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../../../constants/general';
import {useDispatch, useSelector} from 'react-redux';
import {setDistance, setTime} from '../../../redux/mapSlice';
import {useDispatcherApis} from '../../../apis';
import {NearbyDriversLocations} from './NearbyDriversLocations';
import {PathFromSourceToDestination} from './PathFromSourceToDestination';

export const MapScreen = ({origin, destination}: any) => {
  const [waypoints, setWaypoints] = useState([]);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const {getDistanceAndTimeOfTrip, data: dataAndTime} = useDispatcherApis();

  useEffect(() => {
    if (dataAndTime) {
      // @ts-ignore
      dispatch(setDistance(dataAndTime?.distanceValue));
      // @ts-ignore
      dispatch(setTime(dataAndTime?.durationValue));
    }
  }, [dataAndTime]);

  const {totalDistance, totalTime, minFareAmount} = useSelector(
    (state: any) => {
      return state?.map;
    },
  );

  const getDistanceAndTime = useCallback(async () => {
    try {
      if (
        origin?.latitude &&
        origin?.longitude &&
        destination?.latitude &&
        destination?.longitude
      ) {
        const payload = {
          latitude: origin?.latitude,
          longitude: origin?.longitude,
          d_latitude: destination?.latitude,
          d_longitude: destination?.longitude,
        };
        await getDistanceAndTimeOfTrip({payload});
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: RenderMap.tsx:25 ~ getDirections ~ error:',
        error,
      );
      return error;
    }
  }, [origin, destination]);

  useEffect(() => {
    getDistanceAndTime();
  }, [getDistanceAndTime]);

  useEffect(() => {
    const fitMapToCoordinates = () => {
      if (waypoints.length === 0 || !mapRef.current) {
        return;
      }
      // @ts-ignore
      mapRef.current.fitToCoordinates(waypoints, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    };

    fitMapToCoordinates();
  }, [waypoints]);

  useEffect(() => {
    const fitMapToCoordinates = () => {
      if (waypoints.length === 0 || !mapRef.current) {
        return;
      }
      // @ts-ignore
      mapRef.current.fitToCoordinates(waypoints, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    };

    fitMapToCoordinates();
  }, [waypoints]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: (origin?.latitude + destination?.latitude) / 2,
          longitude: (origin?.longitude + destination?.longitude) / 2,
          latitudeDelta: Math.abs(destination?.latitude - origin?.latitude) * 2,
          longitudeDelta:
            Math.abs(destination?.longitude - origin?.longitude) * 2,
        }}>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={result => {
            const waypoints1 = result?.coordinates;
            // @ts-ignore
            setWaypoints(waypoints1);
          }}
        />

        <PathFromSourceToDestination
          origin={origin}
          destination={destination}
          waypoints={waypoints}
        />

        <NearbyDriversLocations />
      </MapView>

      {/* Display the calculated distance */}
      {totalDistance && totalTime && minFareAmount ? (
        <>
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>
              Distance: {`${totalDistance}`}
            </Text>
            <Text style={styles.distanceText}>Time: {`${totalTime}`}</Text>
            <Text style={styles.distanceText}>Fare: {`${minFareAmount}`}</Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  distanceText: {
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
    color: 'black',
  },
});
