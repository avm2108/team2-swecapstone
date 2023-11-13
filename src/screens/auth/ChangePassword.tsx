/* eslint-disable react-native/no-inline-styles */
import {Pressable, View} from 'react-native';
import React, {useState} from 'react';
import ProtectedWrapper from '../../components/hoc/ProtectedWrapper';
import Button from '../../components/Button';
import {STYLES} from '../../constants/styles';
import {InputFieldWithLabel} from '../general/InputFieldWithLabel';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function ChangePassword() {
  const navigation = useNavigation();
  const [passwordResetPayload, setPasswordResetPayload] = useState(() => ({
    password: '',
    confirm_password: '',
  }));

  const handleChange = (path: any, value: any) => {
    // Disabled below code due to incompletion of functionality
    setPasswordResetPayload((prevState: any) => {
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

  const handleSubmit = () => {};

  return (
    // @ts-ignore
    <ProtectedWrapper backgroundColor={'#4EB780'}>
      <View
        style={{
          // paddingBottom: 24,
          paddingTop: 24,
          paddingLeft: 19,
        }}>
        <Pressable
          hitSlop={{top: 30, left: 30, right: 30, bottom: 30}}
          onPress={() => {
            // props.onBackPress
            // ? props.onBackPress()
            // : /
            // @ts-ignore
            navigation.canGoBack() && navigation.pop();
          }}
          style={{width: 50}}>
          <Icon name="arrow-left" size={25} color="black" />
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor: '#4EB780',
          // flex: 1,
          // paddingTop: 32,
          paddingHorizontal: 23,
        }}>
        <Text
          style={{
            color: STYLES.whiteColor,
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            textAlign: 'center',
          }}>
          Change Password
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 24,
            gap: 12,
          }}>
          <InputFieldWithLabel
            style={{width: '100%'}}
            title={'Password'}
            handleChange={(value: string) => handleChange('password', value)}
            inputFieldValue={passwordResetPayload?.password}
            textInputStyles={{height: 26}}
          />
          <InputFieldWithLabel
            style={{width: '100%'}}
            title={'Confirm Password'}
            handleChange={(value: string) =>
              handleChange('confirm_password', value)
            }
            inputFieldValue={passwordResetPayload?.confirm_password}
            textInputStyles={{height: 26}}
          />
        </View>
        <View style={{paddingTop: 12}}>
          <Text
            style={{color: 'white', fontFamily: 'Nunito-Bold', fontSize: 6}}>
            <Text style={{fontSize: 8}}>Password must:{'\n'}</Text>
            Be between 8-34 characters{'\n'}
            Include at least two of the following:{'\n'} An uppercase character
            {'\n'}A lowercase character{'\n'}A number{'\n'}A special character
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            color={STYLES.whiteColor}
            wrapperStyle={{
              marginTop: 16,
              height: 33,
              // width: 190,
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderWidth: 1,
            }}
            title="Reset Password"
            onPress={handleSubmit}
            textStyles={{
              fontSize: 12,
              fontFamily: 'Nunito-Bold',
              color: STYLES.greenColor,
            }}
          />
        </View>
      </View>
    </ProtectedWrapper>
  );
}
