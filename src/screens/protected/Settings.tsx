/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Layout} from './Layout';
import {useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../../components/protected/Sidebar';
import {STYLES} from '../../constants/styles';
import {
  accountSettingsList,
  systemSettingsList,
} from '../../lib/profileMockData';
import {ArrowDownSmallIcon, ArrowRightSmallIcon} from '../../svgs';
import {Card} from '../../components/general/Card';
import {LogoutModal} from '../../components/general/LogoutModal';
import {Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {usePersonDetails} from '../../hooks/usePersonDetails';

const Drawer = createDrawerNavigator();

export default function SettingsWithDrawer({navigation}: any) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}
      id="SettingsDrawer"
      drawerContent={(props: any) => {
        return (
          <SideBar id="SettingsDrawer" navigation={navigation} {...props} />
        );
      }}>
      <Drawer.Screen name="SettingsWithDrawer" component={Settings} />
    </Drawer.Navigator>
  );
}

function Settings() {
  const navigation = useNavigation();

  return (
    <Layout navigation={navigation}>
      <View
        style={{
          paddingTop: 29,
          paddingBottom: 12,
          paddingHorizontal: 25,
        }}>
        <ParentCard />
        <SettingsList
          title={' Account Settings'}
          listItems={accountSettingsList}
        />
        <SettingsList
          title={' System Settings'}
          listItems={systemSettingsList}
        />
      </View>
    </Layout>
  );
}

export const ParentCard = ({iconColor, textColor}: any) => {
  const {personData} = usePersonDetails();

  return (
    <ImageWithInfo
      style={{
        gap: 7,
        alignItems: 'center',
        // justifyContent: 'center',
      }}
      image={
        personData?.imageURL ? (
          <Image
            source={{uri: personData?.imageURL}}
            style={{height: 40, width: 40, borderRadius: 12}}
          />
        ) : (
          <MaterialCommunityIcons
            name="account"
            color={iconColor ? iconColor : STYLES.greenColor}
            size={40}
          />
        )
      }
      info={
        <PersonInfo
          name={personData?.name || personData?.email}
          relation={''}
          textColor={textColor}
        />
      }
    />
  );
};

const PersonInfo = ({
  name,
  relation,
  nameTextStyle = {},
  relationTextStyle = {},
  textColor,
}: any) => {
  return (
    <>
      <View>
        {name ? (
          <Text
            style={{
              color: textColor ? textColor : STYLES.blackColor,
              fontFamily: 'Nunito-Bold',
              fontSize: 12,
              ...nameTextStyle,
            }}>
            {name}
          </Text>
        ) : null}
        {relation ? (
          <Text
            style={{
              color: STYLES.greenColor,
              fontSize: 6,
              fontFamily: 'Nunito-Bold',
              ...relationTextStyle,
            }}>
            {relation}
          </Text>
        ) : null}
      </View>
    </>
  );
};

const ImageWithInfo = ({direction = 'row', image, info, style}: any) => {
  return (
    <>
      <View
        style={{
          flexDirection: direction,
          ...style,
        }}>
        {image}
        {info}
      </View>
    </>
  );
};

const SettingsList = ({listItems = [], title}: any) => {
  const [list] = useState(listItems);
  const [showLogoutConfirmationPopup, setShowLogoutConfirmationPopup] =
    useState(false);

  const navigation = useNavigation();

  const handleClickOption = (setting: any) => {
    // @ts-ignore
    navigation.navigate(`${setting?.navigateTo?.stack}`, {
      screen: setting?.navigateTo?.screen,
    });
  };

  const toggleShowInfo = useCallback(
    (setting: any) => {
      // setList((prevList: any) => {
      //   return prevList?.map((item: any) => {
      //     return item?.name === setting?.name
      //       ? {...item, isSelected: !item.isSelected}
      //       : item;
      //   });
      // });
      handleClickOption(setting);
    },
    [list],
  );

  return (
    <>
      <LogoutModal
        showLogoutConfirmationPopup={showLogoutConfirmationPopup}
        setShowLogoutConfirmationPopup={setShowLogoutConfirmationPopup}
      />
      <View style={{paddingTop: 24}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: STYLES.greenColor,
              fontFamily: 'Nunito-Bold',
              fontSize: 12,
            }}>
            {title}
          </Text>
          {/* <PlusSmallIcon /> */}
        </View>

        {/* @ts-ignore */}
        {list?.map((setting, index) => {
          return (
            <View key={`setting_${index}`}>
              <TouchableOpacity
                onPress={() => {
                  if (setting.name === 'Log Out') {
                    setShowLogoutConfirmationPopup(true);
                  } else {
                    handleClickOption(setting);
                  }
                }}>
                <Card
                  style={{
                    paddingVertical: 7,
                    paddingLeft: 10,
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <ImageWithInfo
                    style={{
                      gap: 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    image={setting?.image}
                    info={
                      <PersonInfo
                        name={setting?.name}
                        // relation={setting?.relation}
                      />
                    }
                  />
                  <TouchableOpacity
                    onPress={() => toggleShowInfo(setting)}
                    style={{padding: 13}}>
                    {setting?.isSelected ? (
                      <ArrowDownSmallIcon />
                    ) : (
                      <ArrowRightSmallIcon />
                    )}
                  </TouchableOpacity>
                </Card>
                {/* {setting?.isSelected ? <ScoopUpTeamInfo /> : null} */}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </>
  );
};
