/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LoveOutlineIcon} from '../../../svgs';
import {STYLES} from '../../../constants/styles';
import {CustomImage} from '../../general/CustomImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export const FamilyListCard = () => {
  const [familyList, setFamilyList] = useState<any>([]);
  useEffect(() => {
    const init = async () => {
      const uid = await AsyncStorage.getItem('@access_token')
      const snapshot = await firestore().collection('scoop_up_member').where('uid', '==', uid).get();

      if (!snapshot.empty) {
        const querySnapshot = snapshot.docs;
        const data: any = [];
        console.log(querySnapshot, 'querySnapshot');
        querySnapshot?.forEach(documentSnapshot => {
          data.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        setFamilyList(data);
      } else {
        setFamilyList([])
      }
    };
    init();
  }, []);

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
                  <CustomImage imageUrl={familyPerson?.user_picture} />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Nunito-Bold',
                      color: STYLES.blackColor,
                    }}>
                    {familyPerson?.first_name}
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

