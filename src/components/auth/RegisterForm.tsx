/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {STYLES} from '../../constants/styles';
import {InputFieldWithLabel} from '../../screens/general/InputFieldWithLabel';

export function RegisterForm() {
  const [prefilledData, setPrefilledData] = useState(() => ({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    child_name: '',
    child_relation: '',
    vehicleInfo: {
      vehicle_model: {
        value: '',
      },
      vehicle_color: {
        value: '',
      },
      vehicle_year: {
        value: '',
      },
      license_plate: {
        value: '',
      },
    },
  }));

  useEffect(() => {
    setPrefilledData({
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      child_name: '',
      child_relation: '',
      vehicleInfo: {
        vehicle_model: {
          value: '',
        },
        vehicle_color: {
          value: '',
        },
        vehicle_year: {
          value: '',
        },
        license_plate: {
          value: '',
        },
      },
    });
  }, []);

  const handleChange = (path: any, value: any) => {
    // Disabled below code due to incompletion of functionality
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
  return (
    <View>
      <View>
        <Text
          style={{
            color: STYLES.greenColor,
            fontFamily: 'Nunito-Bold',
            fontSize: 12,
            paddingBottom: 14,
          }}>
          Parent Details
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
            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'First Name'}
              handleChange={(value: string) =>
                handleChange('first_name', value)
              }
              inputFieldValue={prefilledData?.first_name}
              textInputStyles={{height: 26}}
            />
            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'Last Name'}
              handleChange={(value: string) => handleChange('last_name', value)}
              inputFieldValue={prefilledData?.last_name}
              textInputStyles={{height: 26}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'Phone Number'}
              keyboardType="numeric"
              handleChange={(value: string) => handleChange('phone', value)}
              textInputStyles={{height: 26}}
              inputFieldValue={prefilledData?.phone}
            />

            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'Email'}
              handleChange={(value: string) => handleChange('email', value)}
              textInputStyles={{height: 26}}
              inputFieldValue={prefilledData?.email}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'Child Name'}
              handleChange={(value: string) =>
                handleChange('child_name', value)
              }
              textInputStyles={{height: 26}}
              inputFieldValue={prefilledData?.child_name}
            />
            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'Child Relation'}
              handleChange={(value: string) =>
                handleChange('child_relation', value)
              }
              textInputStyles={{height: 26}}
              inputFieldValue={prefilledData?.child_relation}
            />
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: STYLES.greenColor,
            fontFamily: 'Nunito-Bold',
            fontSize: 12,
            paddingBottom: 14,
            paddingTop: 24,
          }}>
          Vehicle Details
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
            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'Vehicle Make/Model'}
              handleChange={(value: string) =>
                handleChange('vehicleInfo.vehicle_model.value', value)
              }
              textInputStyles={{height: 26}}
              inputFieldValue={prefilledData?.vehicleInfo?.vehicle_model?.value}
            />
            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'Vehicle Color'}
              handleChange={(value: string) =>
                handleChange('vehicleInfo.vehicle_color.value', value)
              }
              textInputStyles={{height: 26}}
              inputFieldValue={prefilledData?.vehicleInfo?.vehicle_color?.value}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'Vehicle Year'}
              handleChange={(value: string) =>
                handleChange('vehicleInfo.vehicle_year.value', value)
              }
              textInputStyles={{height: 26}}
              inputFieldValue={prefilledData?.vehicleInfo?.vehicle_year?.value}
            />
            <InputFieldWithLabel
              style={{flex: 1 / 2}}
              title={'License Plate'}
              handleChange={(value: string) =>
                handleChange('vehicleInfo.license_plate.value', value)
              }
              textInputStyles={{height: 26}}
              inputFieldValue={prefilledData?.vehicleInfo?.license_plate?.value}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
