/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Layout} from './Layout';
import {
  ArrowDownSmallIcon,
  ArrowRightSmallIcon,
  MotherSampleImageMedium,
  PlusSmallIcon,
} from '../../svgs';
import {STYLES} from '../../constants/styles';
import {Card} from '../../components/general/Card';
import {useNavigation} from '@react-navigation/native';
import {ScoopUpTeamInfo} from '../../components/protected/Profile/ScoopUpTeamInfo';
import {familyList, scoopUpTeamList} from '../../lib/profileMockData';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../../components/protected/Sidebar';

const Drawer = createDrawerNavigator();

export default function ProfileWithDrawer({navigation}: any) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}
      id="ProfileDrawer"
      drawerContent={(props: any) => {
        return (
          <SideBar id="ProfileDrawer" navigation={navigation} {...props} />
        );
      }}>
      <Drawer.Screen name="ProfileWithDrawer" component={Profile} />
    </Drawer.Navigator>
  );
}

function Profile() {
  const navigation = useNavigation();
  return (
    <Layout navigation={navigation}>
      <View
        style={{
          paddingTop: 29,
          paddingBottom: 12,
          paddingHorizontal: 25,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <ParentCard />
        <PersonalInformation />
        <FamilyInformation />
        <ScoopUpTeamList />
      </View>
    </Layout>
  );
}

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

const PersonInfo = ({
  name,
  relation,
  nameTextStyle = {},
  relationTextStyle = {},
}: any) => {
  return (
    <>
      <View>
        <Text
          style={{
            color: STYLES.blackColor,
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 12,
            ...nameTextStyle,
          }}>
          {name}
        </Text>
        <Text
          style={{color: STYLES.greenColor, fontSize: 6, ...relationTextStyle}}>
          {relation}
        </Text>
      </View>
    </>
  );
};

const ParentCard = () => {
  return (
    <ImageWithInfo
      style={{
        gap: 7,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      image={<MotherSampleImageMedium />}
      info={<PersonInfo name={'Tracy Kim'} relation={'Mother'} />}
    />
  );
};

const PersonalInformation = () => {
  return (
    <Card
      style={{
        paddingVertical: 7,
        paddingLeft: 10,
        paddingRight: 40,
        marginTop: 15,
      }}>
      <Text
        style={{
          color: STYLES.greenColor,
          fontFamily: 'Nunito-Bold',
          fontSize: 12,
        }}>
        Personal Information
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
          <TitleWithSubText
            style={{flex: 1 / 2}}
            title={'Phone Number'}
            subtitle={'404-478-7707'}
          />
          <TitleWithSubText
            style={{flex: 1 / 2}}
            title={'Vehicle Make/Model'}
            subtitle={'Ford Escape'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithSubText
            style={{flex: 1 / 2}}
            title={'Email Address'}
            subtitle={'tkim3@gmail.com'}
          />
          <TitleWithSubText
            style={{flex: 1 / 2}}
            title={'Vehicle Year'}
            subtitle={'2018'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithSubText
            style={{flex: 1 / 2}}
            title={'Gender'}
            subtitle={'Female'}
          />
          <TitleWithSubText
            style={{flex: 1 / 2}}
            title={'Vehicle Color'}
            subtitle={'Black'}
          />
        </View>
      </View>
    </Card>
  );
};

const TitleWithSubText = ({
  title,
  subtitle,
  style = {},
  titleStyle = {},
  subTitleStyle = {},
}: any) => {
  return (
    <View style={{...style}}>
      <Text
        style={{
          color: STYLES.blackColor,
          fontFamily: 'Nunito-ExtraBold',
          fontSize: 8,
          ...titleStyle,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: STYLES.greenColor,
          fontSize: 6,
          ...subTitleStyle,
          fontFamily: 'Nunito-Bold',
        }}>
        {subtitle}
      </Text>
    </View>
  );
};

const FamilyInformation = () => {
  return (
    <Card
      style={{
        paddingVertical: 7,
        paddingLeft: 10,
        paddingRight: 40,
        marginTop: 15,
      }}>
      <Text
        style={{
          color: STYLES.greenColor,
          fontFamily: 'Nunito-Bold',
          fontSize: 12,
        }}>
        Family
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 12,
        }}>
        {familyList?.map((familyMember, index) => {
          return (
            <ImageWithInfo
              key={`familyMember_${index}`}
              style={{
                gap: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              direction="column"
              image={familyMember?.image}
              info={
                <PersonInfo
                  name={familyMember?.name}
                  relation={familyMember?.relation}
                  relationTextStyle={{textAlign: 'center'}}
                />
              }
            />
          );
        })}
      </View>
    </Card>
  );
};

const ScoopUpTeamList = () => {
  const [list, setList] = useState(scoopUpTeamList);
  const navigation = useNavigation();

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

  const handleClickAddScoopUpTeam = () => {
    // @ts-ignore
    navigation.navigate('Protected', {
      screen: 'AddScoopUpMember',
    });
  };

  return (
    <View style={{paddingTop: 12}}>
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
          Scoop-up Team
        </Text>
        <TouchableOpacity onPress={handleClickAddScoopUpTeam}>
          <PlusSmallIcon />
        </TouchableOpacity>
      </View>

      {list?.map((familyMember, index) => {
        return (
          <View key={`familyMember_${index}`}>
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
                image={familyMember?.image}
                info={
                  <PersonInfo
                    name={familyMember?.name}
                    relation={familyMember?.relation}
                  />
                }
              />
              <TouchableOpacity
                onPress={() => toggleShowInfo(familyMember?.name)}
                style={{padding: 13}}>
                {familyMember?.isSelected ? (
                  <ArrowDownSmallIcon />
                ) : (
                  <ArrowRightSmallIcon />
                )}
              </TouchableOpacity>
            </Card>
            {familyMember?.isSelected ? (
              <ScoopUpTeamInfo
                id={familyMember?.id}
                vehicleInfo={familyMember?.vehicleInfo}
                allInfo={familyMember}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
};
