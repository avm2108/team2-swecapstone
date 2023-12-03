import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export function usePersonDetails() {
  const [personData, setPersonData] = useState<any>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        // Assuming 'yourCollection' is the name of your Firestore collection
        const token = await AsyncStorage.getItem('@access_token');
        console.log(token, 'token');
        const snapshot = await firestore()
          .collection('users')
          .where('uid', '==', token)
          .get();

        if (!snapshot.empty) {
          // Assuming you only want one record; if there are multiple, you might need to iterate over the docs
          const personData = snapshot.docs[0].data();
          setPersonData(personData);
        } else {
          Alert.alert('No User found ... Please logout and login again');
          return;
        }
      } catch (error) {
        Alert.alert('Something went wrong please try again');
      }
    };
    fetchRecord();
  }, []);

  return {personData};
}

function preparePayload(payload: any) {
  // Define default values for missing keys
  const defaultValues = {
    email: '',
    name: '',
    phone: '',
    relation: '',
    vehicle: {
      color: '',
      model: '',
      year: '',
      make: '',
    },
  };

  // Iterate through the default values and add missing keys to the payload
  const updatedPayload = {...defaultValues, ...payload};

  // If the 'vehicle' key is missing in the payload, add it with default values
  if (!updatedPayload.vehicle) {
    updatedPayload.vehicle = {...defaultValues.vehicle, ...payload.vehicle};
  }

  return updatedPayload;
}
