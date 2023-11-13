/* eslint-disable react-native/no-inline-styles */
import {useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../../../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradientBase from '../../general/LinearGradientBase';
import {STYLES} from '../../../constants/styles';
import {CustomModal} from '../../general/Modal';
import Button from '../../Button';
import {MotherSampleImageMedium} from '../../../svgs';
import * as React from 'react';
import {useSelector} from 'react-redux';

export interface MenuItemInterface {
  label: string;
  onPress: () => void;
}

const menuOptions = [
  {
    name: 'scheduled_scoop_up',
    title: 'Schedule Scoop Up',
    icon: <Icon name="car" color="black" size={25} />,
  },
  {
    name: 'family_management',
    title: 'Family Management',
    icon: <Icon name="car" color="black" size={25} />,
  },
  {
    name: 'contact_school',
    title: 'Contact School',
    icon: <Icon name="car" color="black" size={25} />,
  },
  {
    name: 'logout',
    title: 'Log Out',
    icon: <Icon name="sign-out" color="black" size={25} />,
  },
];

const SideBar: React.FC = ({id, navigation}: any) => {
  // const navigation = useNavigation();
  // @ts-ignore
  const {signOut} = React.useContext(AuthContext);
  const [showLogoutConfirmationPopup, setShowLogoutConfirmationPopup] =
    useState(false);
  // @ts-ignore
  const {user} = useSelector(state => state?.user);

  const handleSelectOption = (value: string) => {
    switch (value) {
      case 'logout':
        setShowLogoutConfirmationPopup(true);
        break;
      case 'scheduled_scoop_up':
        navigation.navigate('Protected', {
          screen: 'SubmittedRequests',
        });
        break;
      case 'family_management':
        navigation.navigate('Protected', {
          screen: 'ScheduledScoopUp',
        });
        break;
      default:
        return;
    }
  };

  return (
    <>
      <LinearGradientBase
        colors={[
          STYLES.greenColor,
          STYLES.whiteColor,
          STYLES.lightGreenColor,
          STYLES.blackColor,
          STYLES.veryLightGrayColor,
          STYLES.baseColor,
        ]}
        start={{x: 1, y: 1}}
        linearGradientContainerStyle={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            // navigation.dispatch(
            //   DrawerActions.getParent('RightDrawer').closeDrawer(),
            // );
            // @ts-ignore
            navigation.getParent(id).closeDrawer();
          }}
          style={{
            // flex: 0.5 / 3,
            paddingVertical: 31,
            paddingHorizontal: 24,
            alignItems: 'flex-end',
          }}>
          {/* <Icon name="times" color="white" size={30} /> */}

          <Text
            style={{
              height: 25,
              width: 25,
              color: STYLES.whiteColor,
              fontSize: 20,
              fontFamily: 'Nunito-Bold',
            }}>
            X
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}>
          <MotherSampleImageMedium />
          <Text
            style={{
              color: STYLES.lightGreenColor,
              fontSize: 20,
              fontFamily: 'Nunito-Bold',
            }}>
            {user?.displayName || user?.email || ''}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            padding: 24,
            gap: 35,
          }}>
          {menuOptions?.map((option, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleSelectOption(option.name);
                }}
                key={index}
                style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    color: STYLES.whiteColor,
                    fontFamily: 'Nunito-Bold',
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradientBase>

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
    </>
  );
};

export default SideBar;
