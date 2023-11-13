/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';
import {Button} from '../../components';
import AuthScreenWrapper from '../../components/hoc/AuthWrapper';
import {STYLES} from '../../constants/styles';
import {ScooperLogo} from '../../svgs/ScooperLogo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RegisterForm} from '../../components/auth/RegisterForm';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
    } catch (error) {}
  };

  return (
    <AuthScreenWrapper showBackArrowIcon={false}>
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

        <View style={{alignItems: 'center'}}>
          <ScooperLogo />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 24,
          borderRadius: 24,
        }}>
        <Text
          // @ts-ignore
          style={{
            color: STYLES.lightGreenColor,
            fontSize: 20,
            fontFamily: 'Nunito-Bold',
            // paddingTop: 12,
            textAlign: 'center',
            marginBottom: 31,
          }}>
          Complete Your Registration
        </Text>

        <RegisterForm />

        <View style={{alignItems: 'center'}}>
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
            textStyles={{fontSize: 12, fontFamily: 'Nunito-Bold'}}
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
      </View>
    </AuthScreenWrapper>
  );
}
