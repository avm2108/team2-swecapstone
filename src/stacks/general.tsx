import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import ChangePassword from '../screens/auth/ChangePassword';

export default function General() {
  return (
    <Stack.Navigator initialRouteName="ChangePassword">
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
