/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {CustomModal} from './Modal';
import Button from '../Button';
import {STYLES} from '../../constants/styles';
import {AuthContext} from '../../../App';

export function LogoutModal({
  showLogoutConfirmationPopup,
  setShowLogoutConfirmationPopup,
}: any) {
  // @ts-ignore
  const {signOut} = React.useContext(AuthContext);

  return (
    <CustomModal
      visible={showLogoutConfirmationPopup}
      onClose={() => {
        setShowLogoutConfirmationPopup(false);
      }}
      modalWrapperStyle={{
        backgroundColor: STYLES.lightGreenColor,
        marginHorizontal: 12,
        paddingHorizontal: 45,
        paddingVertical: 68,
        justifyContent: 'center',
        maxHeight: 300,
        borderRadius: 76,
      }}
      backdropColor={'transparent'}>
      <Text
        style={{
          fontSize: 28,
          textAlign: 'center',
          fontFamily: 'Nunito-ExtraBold',
          color: STYLES.whiteColor,
        }}>
        Confirm Log Out
      </Text>

      <View style={{marginTop: 23, flexDirection: 'row', gap: 20}}>
        <Button
          color={STYLES.greenColor}
          wrapperStyle={{paddingHorizontal: 32}}
          title="Confirm"
          textStyles={{fontSize: 16, fontFamily: 'Nunito-Bold'}}
          onPress={() => {
            // @ts-ignore
            signOut();
            setShowLogoutConfirmationPopup(false);
          }}
        />

        <Button
          wrapperStyle={{
            paddingHorizontal: 32,
            backgroundColor: STYLES.whiteColor,
          }}
          title="Cancel"
          textStyles={{
            fontSize: 16,
            color: STYLES.redColor,
            fontFamily: 'Nunito-Bold',
          }}
          onPress={() => {
            setShowLogoutConfirmationPopup(false);
          }}
        />
      </View>
    </CustomModal>
  );
}
