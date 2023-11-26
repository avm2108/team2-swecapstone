import React from 'react';
import {
  DaughterSampleImageSmall,
  FatherSampleImageSmall,
  KeyIcon,
  LifeBuoyIcon,
  LockIcon,
  MapIcon,
  PeopleIcon,
  SonSampleImageSmall,
  SupportIcon,
} from '../svgs';

export const familyList = [
  {
    name: 'Emily Kim',
    relation: 'Daughter',
    image: <DaughterSampleImageSmall />,
  },
  {
    name: 'Bryan Kim',
    relation: 'Son',
    image: <SonSampleImageSmall />,
  },
  {
    name: 'Hiro Kim',
    relation: 'Father',
    image: <FatherSampleImageSmall />,
  },
];

export const accountSettingsList = [
  {
    name: 'Change Password',
    image: <KeyIcon />,
    isSelected: false,
    navigateTo: {stack: 'General', screen: 'ChangePassword'},
  },
  {
    name: 'Change SOS Pin',
    image: <LifeBuoyIcon />,
    isSelected: false,
    navigateTo: {stack: 'Protected', screen: 'EnterSOSPIN'},
  },
  {
    name: 'Update Scoopup Team',
    image: <PeopleIcon />,
    isSelected: false,
    navigateTo: {stack: 'Protected', screen: 'AddOrUpdateScoopUpMember'},
  },
];

export const systemSettingsList = [
  {
    name: 'Location Settings',
    image: <MapIcon />,
    isSelected: false,
    navigateTo: '',
  },
  {
    name: 'Support',
    image: <SupportIcon />,
    isSelected: false,
    navigateTo: '',
  },
  {
    name: 'Log Out',
    image: <LockIcon />,
    isSelected: false,
  },
];

export const scoopUpTeamList = [
  {
    id: 1,
    name: 'Anne Moore',
    relation: 'Aunt',
    image: <FatherSampleImageSmall />,
    email: 'anne.more@gmail.com',
    phone: '404-234-2345',
    gender: 'Female',
    isSelected: false,
    vehicleInfo: {
      vehicle_model: {
        label: 'Vehicle Make/Model',
        value: 'Kia Soul',
      },
      vehicle_color: {
        label: 'Vehicle Color',
        value: 'White',
      },
      vehicle_year: {
        label: 'Vehicle Year',
        value: '2021',
      },
      phone_number: {
        label: 'Phone Number',
        value: '404-444-4444',
      },
    },
  },
  {
    id: 2,
    name: 'Jim Moore',
    relation: 'Uncle',
    image: <FatherSampleImageSmall />,
    email: 'jim.more@gmail.com',
    phone: '494-134-8345',
    gender: 'Male',
    isSelected: false,
    vehicleInfo: {
      vehicle_model: {
        label: 'Vehicle Make/Model',
        value: 'Kia Soul',
      },
      vehicle_color: {
        label: 'Vehicle Color',
        value: 'White',
      },
      vehicle_year: {
        label: 'Vehicle Year',
        value: '2021',
      },
      phone_number: {
        label: 'Phone Number',
        value: '404-444-4444',
      },
    },
  },
  {
    id: 3,
    name: 'Trish Reed',
    relation: 'Friend',
    image: <FatherSampleImageSmall />,
    email: 'trish.reed@gmail.com',
    phone: '454-690-3145',
    gender: 'Male',
    isSelected: false,
    vehicleInfo: {
      vehicle_model: {
        label: 'Vehicle Make/Model',
        value: 'Kia Soul',
      },
      vehicle_color: {
        label: 'Vehicle Color',
        value: 'White',
      },
      vehicle_year: {
        label: 'Vehicle Year',
        value: '2021',
      },
      phone_number: {
        label: 'Phone Number',
        value: '404-444-4444',
      },
    },
  },
];
