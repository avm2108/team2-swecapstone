/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Layout} from './Layout';
import {STYLES} from '../../constants/styles';
import {Card} from '../../components/general/Card';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native';
import {Button} from '../../components';

export default function AddScoopupMemberWithDrawer({route}: any) {
  return <ScoopUpMemberForm info={route?.params?.data} />;
}

function ScoopUpMemberForm({info}: any) {
  const navigation = useNavigation();
  return (
    <Layout navigation={navigation} backIcon={true}>
      <View
        style={{
          paddingTop: 29,
          paddingBottom: 12,
          paddingHorizontal: 25,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <PersonalInformation info={info} />
      </View>
    </Layout>
  );
}

const PersonalInformation = ({info}: any) => {
  const [prefilledData, setPrefilledData] = useState(() => info);

  useEffect(() => {
    setPrefilledData(info);
  }, [info]);

  const handleChange = (path: any, value: any) => {
    setPrefilledData((prevState: any) => {
      const newState = {...prevState};
      const keys = path?.split('.');

      if (keys?.length === 1) {
        // Update a top-level property
        newState[keys?.[0]] = value;
      } else {
        // Update a nested property
        let current = newState;
        for (let i = 0; i < keys?.length - 1; i++) {
          current = current[keys?.[i]];
        }
        current[keys[keys?.length - 1]] = value;
      }

      return newState;
    });
  };

  const handleSave = () => {};

  return (
    <Card
      style={{
        paddingTop: 19,
        paddingLeft: 13,
        paddingRight: 29,
        marginTop: 15,
        paddingBottom: 27,
      }}>
      <Text
        style={{
          color: STYLES.greenColor,
          fontFamily: 'Nunito-Bold',
          fontSize: 12,
          paddingBottom: 14,
        }}>
        Add Scoop-up Member
      </Text>

      <View
        style={{
          gap: 7,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 3,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'First Name'}
            handleChange={(value: string) => handleChange('phone', value)}
            inputFieldValue={prefilledData?.phone}
          />
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Last Name'}
            handleChange={(value: string) =>
              handleChange('vehicleInfo.vehicle_model.value', value)
            }
            inputFieldValue={prefilledData?.vehicleInfo?.vehicle_model?.value}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Phone Number'}
            handleChange={(value: string) => handleChange('email', value)}
            inputFieldValue={prefilledData?.email}
          />
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Relation'}
            handleChange={(value: string) =>
              handleChange('vehicleInfo.vehicle_year.value', value)
            }
            inputFieldValue={prefilledData?.vehicleInfo?.vehicle_year?.value}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Vehicle Make/Model'}
            handleChange={(value: string) => handleChange('gender', value)}
            inputFieldValue={prefilledData?.gender}
          />
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'License Plate'}
            handleChange={(value: string) =>
              handleChange('vehicleInfo.vehicle_color.value', value)
            }
            inputFieldValue={prefilledData?.vehicleInfo?.vehicle_color?.value}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Vehicle Year'}
            handleChange={(value: string) => handleChange('gender', value)}
            inputFieldValue={prefilledData?.gender}
          />
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'License Color'}
            handleChange={(value: string) =>
              handleChange('vehicleInfo.vehicle_color.value', value)
            }
            inputFieldValue={prefilledData?.vehicleInfo?.vehicle_color?.value}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'User Picture'}
            handleChange={(value: string) => handleChange('gender', value)}
            inputFieldValue={prefilledData?.gender}
          />
          <View style={{flex: 1 / 2}} />
          {/* 
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'License Color'}
            handleChange={(value: string) =>
              handleChange('vehicleInfo.vehicle_color.value', value)
            }
            inputFieldValue={prefilledData?.vehicleInfo?.vehicle_color?.value}
          /> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Button
            color={STYLES.greenColor}
            wrapperStyle={{
              marginTop: 16,
              height: 20,
              // width: 190,
              // paddingVertical: 8,
              paddingHorizontal: 17,
              paddingVertical: 0,
            }}
            title="Save"
            onPress={() => {}}
            textStyles={{fontSize: 14, fontFamily: 'Nunito-SemiBold'}}
            // processing={isApiCalling}
          />
          <Button
            color={'transparent'}
            wrapperStyle={{
              marginTop: 16,
              height: 20,
              paddingVertical: 0,
              paddingHorizontal: 17,
              borderWidth: 1,
            }}
            title="Cancel"
            onPress={() => {}}
            textStyles={{
              fontSize: 14,
              fontFamily: 'Nunito-Bold',
              color: 'black',
            }}
            // processing={isApiCalling}
          />
        </View>
      </View>
    </Card>
  );
};

const TitleWithInputField = ({
  title,
  style = {},
  titleStyle = {},
  handleChange = () => {},
  inputFieldValue = '',
}: any) => {
  return (
    <View style={{...style}}>
      <Text
        style={{
          color: STYLES.blackColor,
          fontFamily: 'Nunito-Bold',
          fontSize: 8,
          ...titleStyle,
        }}>
        {title}
      </Text>
      <TextInput
        onChange={handleChange}
        style={{
          paddingHorizontal: 7,
          height: 18,
          paddingVertical: 0,
          fontSize: 6,
          fontFamily: 'Nunito-Bold',
          marginRight: 10,
          borderRadius: 4,
          marginTop: 7,
          color: STYLES.lightGreenColor,
          backgroundColor: STYLES.veryLightGrayColor,
        }}
        value={inputFieldValue}
      />
      {/* <Text style={{color: STYLES.greenColor, fontSize: 6, ...inputFieldStyle}}>
        {inputFieldValue}
      </Text> */}
    </View>
  );
};
