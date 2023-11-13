import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginWithUsernameAndPassword} from '../screens';
import AuthOptions from '../screens/auth/AuthOptions';
const Stack = createStackNavigator();
import firebaseAuth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {LogBox} from 'react-native';
import {setUsers} from '../redux/userSlice';
import Register from '../screens/auth/Register';
import ChangePassword from '../screens/auth/ChangePassword';

const serializeFirebaseUser = (firebaseUser: any) => {
  return {
    displayName: firebaseUser?.displayName,
    email: firebaseUser?.email,
    emailVerified: firebaseUser?.emailVerified,
    isAnonymous: firebaseUser?.isAnonymous,
    metadata: firebaseUser?.metadata,
    multiFactor: firebaseUser?.multiFactor,
    phoneNumber: firebaseUser?.phoneNumber,
    photoURL: firebaseUser?.photoURL,
    providerData: firebaseUser?.providerData,
    providerId: firebaseUser?.providerId,
    tenantId: firebaseUser?.tenantId,
    uid: firebaseUser?.uid,
  };
};

export default function Auth() {
  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    const onAuthStateChanged = (user: any) => {
      if (!user) {
        return;
      }

      const serializeFirebaseUserFinal = serializeFirebaseUser(user);
      reduxDispatch(setUsers(serializeFirebaseUserFinal));
    };

    firebaseAuth().onAuthStateChanged(onAuthStateChanged);

    return () => {
      firebaseAuth().onAuthStateChanged(onAuthStateChanged);
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="AuthOptions">
      <Stack.Screen
        name="AuthOptions"
        component={AuthOptions}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginWithUsernameAndPassword"
        component={LoginWithUsernameAndPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
