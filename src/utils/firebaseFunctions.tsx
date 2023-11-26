import firestore from '@react-native-firebase/firestore';
// const currentUserUid = firebase.auth().currentUser?.uid;
// console.log(
//   '🚀 ~ file: firebaseFunctions.tsx:3 ~ currentUserUid:',
//   currentUserUid,
// );

// Reference to your Firestore collection

// CREATE
export const addDocument = async ({collectionName, payload}: any) => {
  try {
    const collectionRef = firestore().collection(collectionName);
    const docRef = await collectionRef.add(payload);
    console.log('Document added with ID: ', docRef.id);
    return {status: true, message: 'Document added successfully'};
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

// READ
export const getDocuments = async ({collectionName}: any) => {
  try {
    const collectionRef = firestore().collection(collectionName);

    const snapshot: any = await collectionRef.get();

    snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (snapshot?._docs) {
      const response = snapshot._docs.map((doc: any) => ({
        ...doc._data,
        id: doc.id,
      }));
      return response;
    }
    return [];
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// UPDATE
export const updateDocument = async ({collectionName, docId, payload}: any) => {
  try {
    const collectionRef = firestore().collection(collectionName);

    await collectionRef.doc(docId).update(payload);
    console.log('Document updated successfully');
    return {status: true, message: 'Document updated successfully'};
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

// DELETE
export const deleteDocument = async ({collectionName, docId}: any) => {
  try {
    const collectionRef = firestore().collection(collectionName);

    await collectionRef.doc(docId).delete();
    console.log('Document deleted successfully');
    return {status: true, message: 'Document deleted successfully'};
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};

// New function to get a single document
export const getDocumentById = async ({collectionName, docId}: any) => {
  try {
    const collectionRef = firestore().collection(collectionName);

    const doc = await collectionRef.doc(docId).get();

    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data(),
      };
    } else {
      console.error('Document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error getting document by ID: ', error);
    throw error;
  }
};
