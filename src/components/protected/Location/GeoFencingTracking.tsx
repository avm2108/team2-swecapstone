import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { GeofencingEventType } from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

export default function GeoFencingTracking() {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const requestPermissions = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.BestForNavigation,
        });

        await Location.startGeofencingAsync(LOCATION_TASK_NAME, [{
          latitude: 37.348969524600406,
          longitude: -122.10384676422899,
          radius: 600,
          notifyOnEnter: true,
          notifyOnExit: false
        }])
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={requestPermissions} title="Enable background location" />
    </View>
  );
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    // do something with the locations captured in the background
    console.log(locations)
  }
});

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});