/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../../../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradientBase from '../../general/LinearGradientBase';
import {STYLES} from '../../../constants/styles';
import {CustomModal} from '../../general/Modal';
import Button from '../../Button';
import {MotherSampleImageMedium} from '../../../svgs';

export interface MenuItemInterface {
  label: string;
  onPress: () => void;
}

const menuOptions = [
  {
    name: 'normal',
    title: 'Schedule Scoop Up',
    icon: <Icon name="car" color="black" size={25} />,
  },
  {
    name: 'accepted',
    title: 'Family Management',
    icon: <Icon name="car" color="black" size={25} />,
  },
  {
    name: 'arrived',
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

  const handleSelectOption = (value: string) => {
    switch (value) {
      case 'normal':
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {key: 'request_list', screenHeading: 'Normal Trips'},
        });
        break;
      case 'accepted':
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {
            key: 'accepted_request_list',
            screenHeading: 'Accepted Trips',
          },
        });
        break;
      case 'arrived':
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {key: 'arrived_request_list', screenHeading: 'Arrived Trips'},
        });
        break;
      case 'started':
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {key: 'started_request_list', screenHeading: 'Started Trips'},
        });
        break;
      case 'logout':
        setShowLogoutConfirmationPopup(true);

        break;
      default:
        // @ts-ignore
        navigation.navigate('Protected', {
          screen: 'TripsList',
          params: {key: 'request_list', screenHeading: 'Normal Trips'},
        });
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
              fontWeight: '700',
              color: STYLES.whiteColor,
              fontSize: 20,
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
              fontWeight: '700',
              color: STYLES.lightGreenColor,
              fontSize: 20,
            }}>
            Tracy Kim
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
                    fontFamily: 'Nunito-Black',
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
            fontWeight: '800',
            textAlign: 'center',
            color: STYLES.whiteColor,
          }}>
          Confirm Log Out
        </Text>

        <View style={{marginTop: 23, flexDirection: 'row', gap: 20}}>
          <Button
            color={STYLES.greenColor}
            wrapperStyle={{paddingHorizontal: 32}}
            title="Confirm"
            textStyles={{fontSize: 16}}
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
            textStyles={{fontSize: 16, color: STYLES.redColor}}
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
