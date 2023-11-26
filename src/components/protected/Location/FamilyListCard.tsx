/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {LoveOutlineIcon} from '../../../svgs';
import {STYLES} from '../../../constants/styles';
import {CustomImage} from '../../general/CustomImage';
import {useGetFamilyList} from '../../../hooks/useGetFamilyList';

export const FamilyListCard = () => {
  const {familyList} = useGetFamilyList();
  // console.log(
  //   '🚀 ~ file: FamilyListCard.tsx:11 ~ FamilyListCard ~ familyList:',
  //   familyList,
  // );

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
            fontFamily: 'Nunito-Bold',
            color: STYLES.lightGreenColor,
          }}>
          Family
        </Text>
        {familyList?.map((familyPerson: any, index: any) => {
          return (
            <View
              key={`familyPerson_${index}`}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', gap: 7}}>
                <View>
                  <CustomImage imageUrl={familyPerson?.family_member_picture} />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Nunito-Bold',
                      color: STYLES.blackColor,
                    }}>
                    {familyPerson?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 6,
                      color: STYLES.greenColor,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    {familyPerson?.status}
                  </Text>
                  <Text
                    style={{
                      fontSize: 6,
                      color: STYLES.blackColor,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    {/* TODO: Since text should be dynamic */}
                    Checked In Since {familyPerson?.checkedInSince}
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
