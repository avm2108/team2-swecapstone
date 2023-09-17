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
import {
  ArrowDownSmallIcon,
  ArrowRightSmallIcon,
  MotherSampleImageMedium,
  PlusSmallIcon,
} from '../../svgs';
import {Card} from '../../components/general/Card';
import {ScoopUpTeamInfo} from '../../components/protected/Profile/ScoopUpTeamInfo';

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

const ParentCard = () => {
  return (
    <ImageWithInfo
      style={{
        gap: 7,
        alignItems: 'center',
        // justifyContent: 'center',
      }}
      image={<MotherSampleImageMedium />}
      info={<PersonInfo name={'Tracy Kim'} relation={'Mother'} />}
    />
  );
};

const PersonInfo = ({
  name,
  relation,
  nameTextStyle = {},
  relationTextStyle = {},
}: any) => {
  return (
    <>
      <View>
        {name ? (
          <Text
            style={{
              color: STYLES.blackColor,
              fontWeight: '800',
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
  const [list, setList] = useState(listItems);

  const toggleShowInfo = useCallback(
    (name: any) => {
      setList((prevList: any) => {
        return prevList?.map((item: any) => {
          return item?.name === name
            ? {...item, isSelected: !item.isSelected}
            : item;
        });
      });
    },
    [list],
  );

  return (
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
            fontWeight: '700',
            fontSize: 12,
          }}>
          {title}
        </Text>
        <PlusSmallIcon />
      </View>

      {/* @ts-ignore */}
      {list?.map((setting, index) => {
        return (
          <View key={`setting_${index}`}>
            <TouchableOpacity
              onPress={() => {
                if (setting.name === 'Log Out') {
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
                  onPress={() => toggleShowInfo(setting?.name)}
                  style={{padding: 13}}>
                  {setting?.isSelected ? (
                    <ArrowDownSmallIcon />
                  ) : (
                    <ArrowRightSmallIcon />
                  )}
                </TouchableOpacity>
              </Card>
              {setting?.isSelected ? <ScoopUpTeamInfo /> : null}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
