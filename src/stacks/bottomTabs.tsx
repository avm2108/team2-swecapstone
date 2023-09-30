/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {STYLES} from '../constants/styles';
import Profile from '../screens/protected/Profile';
import Settings from '../screens/protected/Settings';

export function BottomTabNavigation({HomeScreen = <></>}) {
  const Tab = createBottomTabNavigator();

  const CustomTabButton = (props: any) => (
    <Pressable
      {...props}
      style={
        props.accessibilityState.selected
          ? [
              props.style,
              {
                paddingTop: 13,
              },
            ]
          : [
              props.style,
              {
                paddingTop: 13,
                borderTopColor: 'transparent',
                borderTopWidth: 2,
              },
            ]
      }
    />
  );
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case 'Home':
              return focused ? (
                <MaterialCommunityIcons
                  name="home"
                  color={STYLES.greenColor}
                  size={20}
                />
              ) : (
                <MaterialCommunityIcons
                  name="home"
                  color={STYLES.lightGreenColor}
                  size={20}
                />
              );
            case 'Profile':
              return focused ? (
                <MaterialCommunityIcons
                  name="account"
                  color={STYLES.greenColor}
                  size={20}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  color={STYLES.lightGreenColor}
                  size={20}
                />
              );
            case 'Location':
              return focused ? (
                <MaterialCommunityIcons
                  name="map-marker"
                  color={STYLES.greenColor}
                  size={20}
                />
              ) : (
                <MaterialCommunityIcons
                  name="map-marker"
                  color={STYLES.lightGreenColor}
                  size={20}
                />
              );
            case 'Settings':
              return focused ? (
                <MaterialIcons
                  name="settings"
                  color={STYLES.greenColor}
                  size={20}
                />
              ) : (
                <MaterialIcons
                  name="settings"
                  color={STYLES.lightGreenColor}
                  size={20}
                />
              );
            default:
              return focused ? (
                <MaterialCommunityIcons
                  name="home"
                  color={STYLES.greenColor}
                  size={20}
                />
              ) : (
                <MaterialCommunityIcons name="home" color={'black'} size={20} />
              );
          }
        },
        tabBarStyle: {
          borderRadius: 14,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          shadowOffset: {width: 2, height: 16},
          shadowRadius: 10,
          elevation: 5,
          height: 75,
          paddingBottom: 24,
        },
        tabBarLabelStyle: {
          paddingTop: 2,
          paddingBottom: 2,
          fontSize: 8,
          fontFamily: 'Nunito-Bold',
        },
        tabBarActiveTintColor: STYLES.greenColor,
        tabBarInactiveTintColor: STYLES.lightGreenColor,
      })}
      initialRouteName={'Location'}
      backBehavior="initialRoute">
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: CustomTabButton,
        }}
        name="Profile"
        // @ts-ignore
        component={Profile}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: CustomTabButton,
        }}
        name="Location"
        // @ts-ignore
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: CustomTabButton,
        }}
        name="Settings"
        // @ts-ignore
        component={Settings}
      />
    </Tab.Navigator>
  );
}
