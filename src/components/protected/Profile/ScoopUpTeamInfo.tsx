/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {STYLES} from '../../../constants/styles';
import {DeleteSmallIcon} from '../../../svgs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export function ScoopUpTeamInfo({id, vehicleInfo, allInfo}: any) {
  const navigation = useNavigation();
  const handleEdit = (scooperId: any) => {
    // @ts-ignore
    navigation.replace('Protected', {
      screen: 'EditProfile',
      params: {scooperId: scooperId, data: allInfo},
    });
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
          title={vehicleInfo?.vehicle_model?.label}
          subtitle={vehicleInfo?.vehicle_model?.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />
        <TitleWithSubText
          style={{flex: 1 / 3}}
          title={vehicleInfo?.vehicle_color?.label}
          subtitle={vehicleInfo?.vehicle_color?.value}
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
          title={vehicleInfo?.vehicle_year?.label}
          subtitle={vehicleInfo?.vehicle_year?.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />

        <TitleWithSubText
          style={{flex: 1 / 3}}
          title={vehicleInfo?.phone_number?.label}
          subtitle={vehicleInfo?.phone_number?.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />
        <View style={{flex: 1 / 3, alignItems: 'flex-end'}}>
          <DeleteSmallIcon />
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
          fontWeight: '800',
          fontSize: 8,
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
