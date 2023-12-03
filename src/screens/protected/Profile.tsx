/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Layout} from './Layout';
import {
  ArrowDownSmallIcon,
  ArrowRightSmallIcon,
  PlusSmallIcon,
} from '../../svgs';
import {STYLES} from '../../constants/styles';
import {Card} from '../../components/general/Card';
import {useNavigation} from '@react-navigation/native';
import {ScoopUpTeamInfo} from '../../components/protected/Profile/ScoopUpTeamInfo';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../../components/protected/Sidebar';
import firestore from '@react-native-firebase/firestore';
import {ParentCard} from './Settings';
import {CustomImage} from '../../components/general/CustomImage';
import {usePersonDetails} from '../../hooks/usePersonDetails';
import {FamilyListHorizontalInformation} from './EditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View style={{alignItems: 'center', paddingBottom: 12}}>
          <ParentCard />
        </View>
        <PersonalInformation />
        <FamilyListHorizontalInformation />
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

const PersonalInformation = () => {
  const navigation = useNavigation();
  const {personData} = usePersonDetails();

  const handleEditClick = () => {
    // @ts-ignore
    navigation.navigate('Protected', {
      screen: 'EditProfile',
      params: {data: personData},
    });
  };

  return (
    <Card
      style={{
        paddingVertical: 7,
        paddingLeft: 10,
        paddingRight: 20,
        marginTop: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: STYLES.greenColor,
              fontFamily: 'Nunito-Bold',
              fontSize: 12,
            }}>
            Personal Information
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleEditClick}>
            <Text
              style={{
                color: STYLES.greenColor,
                fontFamily: 'Nunito-Bold',
                fontSize: 8,
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
            subtitle={personData ? personData?.phone : 'N/A'}
          />
          <TitleWithSubText
            style={{flex: 1 / 2}}
            title={'Vehicle Make/Model'}
            subtitle={personData ? personData?.vehicle?.model?.value : 'N/A'}
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
            subtitle={personData ? personData?.email : 'N/A'}
          />
          <TitleWithSubText
            style={{flex: 1 / 2}}
            title={'Vehicle Year'}
            subtitle={personData ? personData?.vehicle?.year?.value : 'N/A'}
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
            subtitle={personData ? personData?.gender : 'N/A'}
          />
          <TitleWithSubText
            style={{flex: 1 / 2}}
            title={'Vehicle Color'}
            subtitle={personData ? personData?.vehicle?.color?.value : 'N/A'}
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

const ScoopUpTeamList = () => {
  const navigation = useNavigation();

  const [list, setList] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const uid = await AsyncStorage.getItem('@access_token');
    const scoopUpMembersRef = await firestore().collection('scoop_up_member')
    .where('uid', "==", uid).get();
    if(!scoopUpMembersRef.empty) {
      const querySnapshot = scoopUpMembersRef.docs;
      const data: any = [];
        console.log(querySnapshot, 'querySnapshot');
        querySnapshot?.forEach(documentSnapshot => {
          data.push({id: documentSnapshot.id, ...documentSnapshot.data()});
        });
        setList(data);
    } else {
      setList([])
    }
  }
  const toggleShowInfo = useCallback(
    (id: any) => {
      setList((prevList: any) => {
        return prevList?.map((item: any) => {
          return item?.id === id
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
      screen: 'AddOrUpdateScoopUpMember',
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

      {list?.map((familyMember: any, index: any) => {
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
                image={
                  <CustomImage
                    imageUrl={familyMember?.user_picture}
                    imageStyles={{height: 40, width: 40}}
                  />
                }
                info={
                  <PersonInfo
                    name={familyMember?.first_name}
                    relation={familyMember?.child_relation}
                  />
                }
              />
              <TouchableOpacity
                onPress={() => toggleShowInfo(familyMember?.id)}
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
                id={familyMember?.id || index}
                vehicleInfo={familyMember?.vehicle}
                allInfo={familyMember}
                scoopUpDeleteCallback={() => init()}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
};
