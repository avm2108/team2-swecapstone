/* eslint-disable react-native/no-inline-styles */
import {View, Platform, StyleSheet} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import PinScreen from '../../components/general/CustomKeyboard';
import {sleep} from '../../utils/sleep';
import {PINScreenCrossButtonIcon} from '../../svgs';
import {useNavigation} from '@react-navigation/native';
import ProtectedWrapper from '../../components/hoc/ProtectedWrapper';
import Button from '../../components/Button';
import {STYLES} from '../../constants/styles';

export default function SendSOS() {
  const [mpin, setMpin] = useState('');
  const [error, setError] = useState('');
  const mountedRef = useRef(true);
  const abortController = new AbortController();

  const navigation = useNavigation();

  //   useExitApp();

  //   const {handleRedirection} = useOnboardingHandleRedirection();

  const handleValidateMPIN = useCallback(async () => {
    try {
      setError('');
      if (mpin?.length === 4) {
        if (mountedRef.current) {
          setError('');
          await sleep(1000);
          if (mountedRef.current) {
          }
        } else {
          if (mountedRef.current) {
            setError('Invalid PIN');
          }
        }
      } else {
        if (mountedRef.current) {
          setError('Enter 4 Digits to Continue');
        }
      }
    } catch (err) {
      if (mountedRef.current) {
        setError('Invalid PIN');
        console.log('error', err);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      abortController.abort(); // Cancel any ongoing API requests
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (mpin?.length === 4) {
        handleValidateMPIN();
      }

      return () => {
        mounted = false;
      };
    }
  }, [mpin]);

  const pinScreenRef = useRef(null);

  return (
    <ProtectedWrapper backgroundColor={'#4EB780'}>
      <View
        style={{
          backgroundColor: '#4EB780',
          flex: 1,
          // paddingTop: 32,
          paddingHorizontal: 23,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PinScreen
          onRef={() => pinScreenRef?.current}
          keyDown={pin => setMpin(pin)}
          numberOfPins={4}
          numberOfPinsActive={2}
          containerStyle={styles.containerStyle}
          pinInputContainerStyle={styles.pinInputContainerStyle}
          pinStyle={styles.pinStyle}
          keyTextStyle={styles.keyTextStyle}
          tagline="Send SOS"
          taglineStyle={styles.taglineStyle}
          tagline1="Enter a 4-digit PIN"
          tagline1Style={styles.tagline1Style}
          pinActiveStyle={styles.pinActiveStyle}
          errorStyle={styles.errorStyle}
          errorTextStyle={styles.errorTextStyle}
          keyStyle={styles.keyStyle}
          keyboardRowStyle={{marginBottom: 16}}
          keyboard={keyboard}
          rippleContainerBorderRadius={50}
          navigation={navigation}
          errorText={error}
          pinErrorStyle={styles.pinErrorStyle}
          keyboardContainerStyle={styles.keyboardContainerStyle}
          keyboardStyle={styles.keyboardStyle}
          ItemFooter={<BottomButtonActions />}
          keyboardRowStyle={styles.keyboardRowStyle}
          onEnterPress={() => handleValidateMPIN()}
        />
      </View>
    </ProtectedWrapper>
  );
}

const styles = StyleSheet.create({
  pinErrorStyle: {borderColor: 'red'},
  containerStyle: {backgroundColor: '#4EB780'},
  pinInputContainerStyle: {backgroundColor: '#4EB780'},
  keyboardContainerStyle: {backgroundColor: '#4EB780'},
  keyStyle: {
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 60,
    height: 60,
    borderRadius: 12,
    backgrounColor: '#4EB780',
  },
  keyboardStyle: {
    backgroundColor: '#4EB780',
  },
  keyboardRowStyle: {
    backgroundColor: '#4EB780',
  },
  keyTextStyle: {
    // backgroundColor: 'grey',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    paddingTop: 30,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 30,
    lineHeight: 18,
    color: 'white',
  },
  taglineStyle: {
    fontFamily: 'Nunito-Black',
    color: 'white',
    fontSize: 24,
  },
  tagline1Style: {
    fontFamily: 'Nunito-Regular',
    color: 'white',
    fontSize: 10,
  },
  errorTextStyle: {
    color: 'red',
    fontFamily: 'Nunito-Regular',
  },
  pinStyle: {
    borderRadius: 12,
    height: 18,
    width: 18,
    backgroundColor: '#214C34',
  },
  pinActiveStyle: {
    backgroundColor: 'green',
    borderWidth: 0,
  },
  errorStyle: {
    backgroundColor: 'transparent',
    bottom: 16,
    fontFamily: 'Nunito-Regular',
  },
});

const BottomButtonActions = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 24,
        marginTop: 24,
      }}>
      <Button
        color={STYLES.greenColor}
        wrapperStyle={{
          paddingHorizontal: 32,
          flex: 1 / 2,
          borderColor: 'white',
          borderWidth: 1,
        }}
        title="Send"
        textStyles={{fontSize: 14, fontFamily: 'Nunito-Bold'}}
        onPress={() => {
          // @ts-ignore
          // signOut();
          // setShowLogoutConfirmationPopup(false);
          navigation.navigate('Protected', {screen: 'CancelSOS'});
        }}
      />

      <Button
        wrapperStyle={{
          paddingHorizontal: 32,
          backgroundColor: STYLES.whiteColor,
          flex: 1 / 2,
        }}
        title="Cancel"
        textStyles={{
          fontSize: 14,
          color: STYLES.redColor,
          fontFamily: 'Nunito-Bold',
        }}
        onPress={() => {
          // setShowLogoutConfirmationPopup(false);

          navigation.canGoBack()
            ? navigation.pop()
            : navigation.replace('Protected', {screen: 'Dashboard'});
        }}
      />
    </View>
  );
};

const LeftIcon = () => (
  <View
    style={
      Platform.OS === 'ios'
        ? {
            transform: [{translateY: 2.5}, {scale: 0.98}],
          }
        : {
            // width: '100%',
            // backgroundColor: 'red',
          }
    }
    key={'done'}>
    <PINScreenCrossButtonIcon />
  </View>
);

const RightIcon = () => {
  return (
    <View
      style={
        Platform.OS === 'ios' && {
          transform: [{translateY: 2.5}, {scale: 0.98}],
        }
      }
      key={'back'}>
      {/* <PINScreenCrossButtonIcon /> */}
    </View>
  );
};

const keyboard = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [<LeftIcon key={'done'} />, 0, <RightIcon key={'back'} />],
];
