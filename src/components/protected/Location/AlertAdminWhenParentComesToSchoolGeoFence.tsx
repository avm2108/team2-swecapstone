import React, {useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
// import {useState} from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {GeofencingEventType} from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

export function AlertAdminWhenParentComesToSchoolGeoFence() {
  // const [location, setLocation] = useState();
  // const [errorMsg, setErrorMsg] = useState(null);

  const requestPermissions = async () => {
    const {status: foregroundStatus} =
      await Location.requestForegroundPermissionsAsync();

    if (foregroundStatus === 'granted') {
      const {status: backgroundStatus} =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.BestForNavigation,
        });

        const geoFenceResponse = await Location.startGeofencingAsync(
          LOCATION_TASK_NAME,
          [
            {
              // latitude: 37.348969524600406,
              // longitude: -122.10384676422899,

              latitude: 17.4243983,
              longitude: 78.4384442,
              radius: 600,
              notifyOnEnter: true,
              notifyOnExit: false,
            },
          ],
        );
        console.log(
          '🚀 ~ file: AlertAdminWhenParentComesToSchoolGeoFence.tsx:37 ~ requestPermissions ~ geoFenceResponse:',
          geoFenceResponse,
        );
      }
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Button onPress={requestPermissions} title="Enable background location" /> */}
    </View>
  );
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const {locations} = data;
    console.log(
      '🚀 ~ file: AlertAdminWhenParentComesToSchoolGeoFence.tsx:61 ~ TaskManager.defineTask ~ locations:',
      locations,
    );
    // do something with the locations captured in the background
  }
});

TaskManager.defineTask(
  LOCATION_TASK_NAME,
  ({data: {eventType, region}, error}) => {
    console.log(
      '🚀 ~ file: AlertAdminWhenParentComesToSchoolGeoFence.tsx:72 ~ region:',
      region,
    );
    console.log(
      '🚀 ~ file: AlertAdminWhenParentComesToSchoolGeoFence.tsx:72 ~ eventType:',
      eventType,
    );
    if (error) {
      console.log(
        '🚀 ~ file: AlertAdminWhenParentComesToSchoolGeoFence.tsx:87 ~ error:',
        error,
      );
      // check `error.message` for more details.
      return;
    }
    if (eventType === GeofencingEventType.Enter) {
      console.log("You've entered region:", region);
      Alert.alert('Geo Fence Status', `You've entered region: ${region}`);
    } else if (eventType === GeofencingEventType.Exit) {
      console.log("You've left region:", region);
      Alert.alert('Geo Fence Status', `You've left region: ${region}`);
    } else {
      Alert.alert('Geo Fence Status', `Nothing: ${region}`);
    }
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
