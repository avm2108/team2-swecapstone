import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export function usePersonDetails() {
  const [personData, setPersonData] = useState<any>(null);

  useEffect(() => {
    const personRef = firestore().collection('person');

    // .doc(currentUser.uid);
    personRef.onSnapshot(querySnapshot => {
      querySnapshot?.forEach(documentSnapshot => {
        const personDetails = documentSnapshot.data();
        personDetails.id = documentSnapshot.id;
        const finalPrefillableData = preparePayload(personDetails);
        setPersonData(finalPrefillableData ? finalPrefillableData : null);
      });
    });

    // const init = async () => {
    //   const response = await getDocumentById({
    //     collectionName: 'person',
    //   });
    //   console.log(
    //     '🚀 ~ file: AddOrUpdateScoopUpMember.tsx:58 ~ useEffect ~ response:',
    //     response,
    //   );
    //   const finalPrefillableData = preparePayload(response);
    //   console.log(
    //     '🚀 ~ file: Profile.tsx:148 ~ init ~ finalPrefillableData:',
    //     finalPrefillableData,
    //   );
    //   setPersonData(finalPrefillableData);
    // };
    // init();
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
