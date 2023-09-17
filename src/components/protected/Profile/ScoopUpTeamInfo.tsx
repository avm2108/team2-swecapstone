/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {STYLES} from '../../../constants/styles';
import {DeleteSmallIcon} from '../../../svgs';

export function ScoopUpTeamInfo() {
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
          title={infoData.vehicle_model.label}
          subtitle={infoData.vehicle_model.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />
        <TitleWithSubText
          style={{flex: 1 / 3}}
          title={infoData.vehicle_color.label}
          subtitle={infoData.vehicle_color.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />
        <View style={{flex: 1 / 3, alignItems: 'flex-end'}}>
          <Text style={{color: STYLES.lightGreenColor, fontSize: 8}}>Edit</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TitleWithSubText
          style={{flex: 1 / 3}}
          title={infoData.vehicle_year.label}
          subtitle={infoData.vehicle_year.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />

        <TitleWithSubText
          style={{flex: 1 / 3}}
          title={infoData.phone_number.label}
          subtitle={infoData.phone_number.value}
          subTitleStyle={{color: STYLES.lightGreenColor}}
        />
        <View style={{flex: 1 / 3, alignItems: 'flex-end'}}>
          <DeleteSmallIcon />
        </View>
      </View>
    </View>
  );
}

const infoData = {
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
};

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
