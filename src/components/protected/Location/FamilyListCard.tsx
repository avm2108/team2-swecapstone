/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {
  DaughterSampleImageSmall,
  LoveOutlineIcon,
  SonSampleImageSmall,
} from '../../../svgs';
import {STYLES} from '../../../constants/styles';

const familyList = [
  {
    name: 'Emily Kim',
    status: 'Checked in',
    checkedInSince: 'Since 8:24am',
    image: <DaughterSampleImageSmall />,
  },
  {
    name: 'Bryan Kim',
    status: 'Checked out',
    checkedInSince: 'Since 10:25am',
    image: <SonSampleImageSmall />,
  },
];

export const FamilyListCard = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: STYLES.whiteColor,
          gap: 19,
          paddingHorizontal: 24,
          paddingBottom: 14,
          paddingTop: 19,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '700',
            color: STYLES.lightGreenColor,
          }}>
          Family
        </Text>
        {familyList?.map((familyPerson, index) => {
          return (
            <View
              key={`familyPerson_${index}`}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', gap: 7}}>
                <View>{familyPerson.image}</View>
                <View>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: STYLES.blackColor,
                    }}>
                    {familyPerson.name}
                  </Text>
                  <Text style={{fontSize: 6, color: STYLES.greenColor}}>
                    {familyPerson.status}
                  </Text>
                  <Text style={{fontSize: 6, color: STYLES.blackColor}}>
                    {familyPerson.checkedInSince}
                  </Text>
                </View>
              </View>
              <View>
                <LoveOutlineIcon />
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};
