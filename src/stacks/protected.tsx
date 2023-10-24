import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CancelSOS,
  Dashboard,
  EditProfile,
  EnterSOSPIN,
  SendSOS,
  VerifySOSPIN,
} from '../screens';
import AddScoopupMember from '../screens/protected/AddScoopUpMember';

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
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddScoopUpMember"
        component={AddScoopupMember}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnterSOSPIN"
        component={EnterSOSPIN}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifySOSPIN"
        component={VerifySOSPIN}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SendSOS"
        component={SendSOS}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CancelSOS"
        component={CancelSOS}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
