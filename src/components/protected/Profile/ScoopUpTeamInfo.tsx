/* eslint-disable react-native/no-inline-styles */
import {Alert, Text, View} from 'react-native';
import React from 'react';
import {STYLES} from '../../../constants/styles';
import {DeleteSmallIcon} from '../../../svgs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {deleteDocument} from '../../../utils/firebaseFunctions';

export function ScoopUpTeamInfo({id,allInfo, scoopUpDeleteCallback}: any) {
  const navigation = useNavigation();
  const handleEdit = (scooperId: any) => {
    // @ts-ignore
    navigation.navigate('Protected', {
      screen: 'AddOrUpdateScoopUpMember',
      params: {scooperId: scooperId, data: allInfo},
    });
  };

  const handleDelete = async (scooperId: any) => {
    console.log(
      '🚀 ~ file: ScoopUpTeamInfo.tsx:21 ~ handleDelete ~ scooperId:',
      scooperId,
    );
    const response = await deleteDocument({
      collectionName: 'scoop_up_member',
      docId: scooperId,
    });
    console.log(
      '🚀 ~ file: ScoopUpTeamInfo.tsx:26 ~ handleDelete ~ response:',
      response,
    );
    navigation.canGoBack() ? navigation.goBack() : null;
    Alert.alert('Scoop Up Member deleted successfully');
    navigation.replace('Protected', {screen: 'Dashboard'});
  };
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 14,
        paddingBottom: 8,
        top: -5,
      }}>
      <View style={{flexDirection: 'row'}}>
        <TitleWithSubText
          style={{flex: 1 / 3}}
          title={'Model'}
          subtitle={allInfo?.vehicle?.model?.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />
        <TitleWithSubText
          style={{flex: 1 / 3}}
          title={'Color'}
          subtitle={allInfo?.vehicle?.color?.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />
        <View style={{flex: 1 / 3, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => handleEdit(id)}>
            <Text style={{color: STYLES.lightGreenColor, fontSize: 8}}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TitleWithSubText
          style={{flex: 1 / 3}}
          title={'Year'}
          subtitle={allInfo?.vehicle?.year?.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />

        <TitleWithSubText
          style={{flex: 1 / 3}}
          title={'Phone Number'}
          subtitle={allInfo?.phone}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />
        <View style={{flex: 1 / 3, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => handleDelete(id)}
            hitSlop={{top: 10, left: 50, right: 50, bottom: 50}}>
            <DeleteSmallIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export const TitleWithSubText = ({
  title,
  subtitle,
  style = {},
  titleStyle = {},
  subTitleStyle = {},
}: any) => {
  return (
    <View style={{...style}}>
      <Text
        style={{
          color: STYLES.blackColor,
          fontSize: 8,
          fontFamily: 'Nunito-ExtraBold',
          ...titleStyle,
        }}>
        {title}
      </Text>
      <Text style={{color: STYLES.greenColor, fontSize: 6, ...subTitleStyle}}>
        {subtitle}
      </Text>
    </View>
  );
};
