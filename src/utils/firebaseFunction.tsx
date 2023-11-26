import firestore from '@react-native-firebase/firestore';

export const addDataToFirestore = async ({collectionName, payload}: any) => {
  try {
    const response = await firestore()
      .collection(collectionName)
      .add({
        ...payload,
        // Add other fields and their values
      });
    console.log('Data added successfully!');
    return response;
  } catch (error) {
    console.error('Error adding data: ', error);
    throw error;
  }
};
