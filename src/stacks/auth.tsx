import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginWithUsernameAndPassword} from '../screens';
import AuthOptions from '../screens/auth/AuthOptions';
const Stack = createStackNavigator();

export default function Auth() {
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
        name="LoginWithUsernameAndPassword"
        component={LoginWithUsernameAndPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
