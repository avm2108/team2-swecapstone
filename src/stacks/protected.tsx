import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../screens';
const Stack = createStackNavigator();

export default function Protected() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
