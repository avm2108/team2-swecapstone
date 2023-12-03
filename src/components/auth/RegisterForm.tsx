/* eslint-disable react-native/no-inline-styles */
import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { STYLES } from '../../constants/styles';
import { InputFieldWithLabel } from '../../screens/general/InputFieldWithLabel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../Button';
import { addDocument, getDocuments } from '../../utils/firebaseFunctions';
import { useNavigation } from '@react-navigation/native';
import { REGEX_EXPRESSIONS } from '../../utils/regex.constants';
import { isObjectNotEmpty } from '../../utils/utils';
import firebaseAuth from '@react-native-firebase/auth';

export function RegisterForm() {
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      const isNotEmpty = isObjectNotEmpty(prefilledData);
      if (!isNotEmpty) {
        Alert.alert('All the fields are mandatory');
        return;
      }
      if (prefilledData.email && new RegExp(REGEX_EXPRESSIONS.EMAIL).test(prefilledData.email)) {
        if (prefilledData.phone && new RegExp(REGEX_EXPRESSIONS.PHONE_NUMBER).test(prefilledData.phone)) {
          if (prefilledData.confirmPassword === prefilledData?.password) {
            const allUsers = await getDocuments({ collectionName: 'users' });
            if (allUsers) {
              const checkEmailExist = allUsers.filter((obj: any) => obj?.email === prefilledData.email);
              if (checkEmailExist.length > 0) {
                Alert.alert('Email already registered... Try other email id');
              } else {
                const firebaseResponse =
                  await firebaseAuth().createUserWithEmailAndPassword(
                    prefilledData.email,
                    prefilledData.password,
                  );
                if (firebaseResponse) {
                  const userCreated = await addDocument({ payload: { ...prefilledData, confirmPassword: '', uid: firebaseResponse.user.uid }, collectionName: 'users' });
                  if (userCreated) {
                    Alert.alert('Registered Successfully');
                    // @ts-ignore
                    navigation.navigate('LoginWithUsernameAndPassword');
                  } else {
                    Alert.alert('Something went wrong please try again later');
                  }
                }
              }
            }
          } else {
            Alert.alert('Both password and confirm password should be same');
          }
        } else {
          Alert.alert('Please enter valid phone number');
        }
      } else {
        Alert.alert('Email is invalid please enter valid email');
        return;
      }
    } catch (error) {
      Alert.alert('Something went wrong please try again ...');
      throw error;
    }
  };
  const [prefilledData, setPrefilledData] = useState(() => ({
    first_name: '',
    gender: '',
    last_name: '',
    phone: '',
    email: '',
    child_name: '',
    child_relation: '',
    password: '',
    confirmPassword: '',
    isFirstPassword: true,
    vehicle: {
      model: {
        value: '',
      },
      color: {
        value: '',
      },
      year: {
        value: '',
      },
      plate: {
        value: '',
      },
    },
    role: "PARENT"
  }));

  useEffect(() => {
    setPrefilledData({
      first_name: '',
      gender: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      isFirstPassword: true,
      child_name: '',
      child_relation: '',
      vehicle: {
        model: {
          value: '',
        },
        color: {
          value: '',
        },
        year: {
          value: '',
        },
        plate: {
          value: '',
        },
      },
      role: "PARENT"
    });
  }, []);

  const handleChange = (path: any, value: any) => {
    // Disabled below code due to incompletion of functionality
    setPrefilledData((prevState: any) => {
      const newState = { ...prevState };
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
    <>
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
                style={{ flex: 1 / 2 }}
                title={'First Name'}
                handleChange={(value: string) =>
                  handleChange('first_name', value)
                }
                inputFieldValue={prefilledData?.first_name}
                textInputStyles={{ height: 26 }}
              />
              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'Last Name'}
                handleChange={(value: string) => handleChange('last_name', value)}
                inputFieldValue={prefilledData?.last_name}
                textInputStyles={{ height: 26 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'Phone Number'}
                keyboardType="numeric"
                handleChange={(value: string) => handleChange('phone', value)}
                textInputStyles={{ height: 26 }}
                inputFieldValue={prefilledData?.phone}
              />

              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'Email'}
                handleChange={(value: string) => handleChange('email', value)}
                textInputStyles={{ height: 26 }}
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
                style={{ flex: 1 / 2 }}
                title={'Password'}
                handleChange={(value: string) =>
                  handleChange('password', value)
                }
                inputFieldValue={prefilledData?.password}
                textInputStyles={{ height: 26 }}
              />
              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'Confirm Password'}
                handleChange={(value: string) => handleChange('confirmPassword', value)}
                inputFieldValue={prefilledData?.confirmPassword}
                textInputStyles={{ height: 26 }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'Child Name'}
                handleChange={(value: string) =>
                  handleChange('child_name', value)
                }
                textInputStyles={{ height: 26 }}
                inputFieldValue={prefilledData?.child_name}
              />
              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'Child Relation'}
                handleChange={(value: string) =>
                  handleChange('child_relation', value)
                }
                textInputStyles={{ height: 26 }}
                inputFieldValue={prefilledData?.child_relation}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'Gender'}
                handleChange={(value: string) =>
                  handleChange('gender', value)
                }
                textInputStyles={{ height: 26 }}
                inputFieldValue={prefilledData?.gender}
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
                style={{ flex: 1 / 2 }}
                title={'Vehicle Make/Model'}
                handleChange={(value: string) =>
                  handleChange('vehicle.model.value', value)
                }
                textInputStyles={{ height: 26 }}
                inputFieldValue={prefilledData?.vehicle?.model?.value}
              />
              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'Vehicle Color'}
                handleChange={(value: string) =>
                  handleChange('vehicle.color.value', value)
                }
                textInputStyles={{ height: 26 }}
                inputFieldValue={prefilledData?.vehicle?.color?.value}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'Vehicle Year'}
                handleChange={(value: string) =>
                  handleChange('vehicle.year.value', value)
                }
                textInputStyles={{ height: 26 }}
                inputFieldValue={prefilledData?.vehicle?.year?.value}
              />
              <InputFieldWithLabel
                style={{ flex: 1 / 2 }}
                title={'License Plate'}
                handleChange={(value: string) =>
                  handleChange('vehicle.plate.value', value)
                }
                textInputStyles={{ height: 26 }}
                inputFieldValue={prefilledData?.vehicle?.plate?.value}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Button
          color={STYLES.greenColor}
          wrapperStyle={{
            marginTop: 16,
            height: 33,
            width: 190,
            paddingVertical: 8,
          }}
          title="Register"
          onPress={handleSubmit}
          textStyles={{ fontSize: 12, fontFamily: 'Nunito-Bold' }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
            marginBottom: 24,
          }}>
          <Text
            // @ts-ignore
            style={{
              color: STYLES.lightGreenColor,
              fontSize: 10,
              textAlign: 'center',
              fontFamily: 'Nunito-Bold',
            }}>
            Incorrect Information?{' '}
          </Text>
          <TouchableOpacity>
            <Text
              // @ts-ignore
              style={{
                color: STYLES.lightGreenColor,
                fontSize: 10,
                fontFamily: 'Nunito-Bold',
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
              Contact School
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
