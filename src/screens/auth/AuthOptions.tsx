/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import {Button} from '../../components';
import AuthScreenWrapper from '../../components/hoc/AuthWrapper';
import {ScooperLogo} from '../../svgs/ScooperLogo';
import {STYLES} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';

export default function AuthOptions() {
  const navigation = useNavigation();
  return (
    <AuthScreenWrapper showBackArrowIcon={false}>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <View style={{alignItems: 'center', paddingVertical: 24}}>
          <ScooperLogo />
        </View>

        <View style={{paddingHorizontal: 24, paddingTop: 32}}>
          <Button
            color={STYLES.greenColor}
            wrapperStyle={{marginBottom: 18, paddingVertical: 16}}
            title="Login"
            textStyles={{fontSize: 20, fontFamily: 'Nunito-Bold'}}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('LoginWithUsernameAndPassword');
            }}
            // processing={isApiCalling}
          />
          <Button
            color={STYLES.greenColor}
            wrapperStyle={{marginBottom: 40, paddingVertical: 16}}
            title="Register"
            textStyles={{fontSize: 20, fontFamily: 'Nunito-Bold'}}
            // onPress={handleSubmit}
            // processing={isApiCalling}
          />
        </View>
      </View>
    </AuthScreenWrapper>
  );
}
