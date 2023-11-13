/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Layout} from './Layout';
import {DeleteIcon, GreenColorTimer, YellowColorTimer} from '../../svgs';
import {STYLES} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../../components/protected/Sidebar';
import {allRequests, headers} from '../../utils/mockData';

const Drawer = createDrawerNavigator();

export default function SubmittedRequestsWithDrawer({navigation}: any) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}
      id="SubmittedRequestsDrawer"
      drawerContent={(props: any) => {
        return (
          <SideBar
            id="SubmittedRequestsDrawer"
            navigation={navigation}
            {...props}
          />
        );
      }}>
      <Drawer.Screen
        name="SubmittedRequestsWithDrawer"
        component={SubmittedRequests}
      />
    </Drawer.Navigator>
  );
}

function SubmittedRequests() {
  const navigation = useNavigation();
  return (
    <Layout navigation={navigation} backIcon>
      <View
        style={{
          paddingTop: 29,
          paddingBottom: 12,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <TabsWithRenderContent />
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

const TabsWithRenderContent = () => {
  const [tabsList, setTabsList] = useState(() => tabs);

  // Uncomment below code to enable tab switching
  // const handleSelectTab = (tab: any) => {
  //   setTabsList((prevState: any) => {
  //     return prevState?.map((item: any) => {
  //       if (tab.title === item.title) {
  //         return {
  //           ...item,
  //           isSelected: true,
  //           // borderColor: 'black',
  //           elevation: 3,
  //         };
  //       }
  //       return {
  //         ...item,
  //         isSelected: false,
  //         borderColor: 'transparent',
  //         elevation: 0,
  //       };
  //     });
  //   });
  // };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          gap: 7,
          paddingHorizontal: 24,
          borderBottomWidth: 1,
          borderBottomColor: '#4EB780',
          paddingBottom: 12,
        }}>
        {tabsList?.map((tab: any, index: any) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // Uncomment below code to enable tab switching
                //  handleSelectTab(tab)
              }}
              disabled
              style={{
                backgroundColor: tab.backgroundColor,
                borderRadius: 5,
                paddingHorizontal: 11,
                paddingVertical: 5,
                flex: 1 / 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // borderWidth: 1,
                // borderColor: tab.borderColor,
              }}>
              <View>
                <Text
                  style={{
                    color: tab.countColor,
                    fontWeight: '700',
                    fontSize: 9,
                  }}>
                  {tab.count}
                </Text>
                <Text
                  style={{
                    color: tab.titleColor,
                    fontWeight: '700',
                    fontSize: 9,
                  }}>
                  {tab.title}
                </Text>
              </View>
              <View>{tab.icon}</View>
            </TouchableOpacity>
          );
        })}
      </View>
      {tabsList?.find(item => item?.isSelected)?.renderContent}
    </>
  );
};

const Requests = ({requests = [], headers = []}: any) => {
  const [list] = useState(() => requests);

  return (
    <View style={{paddingTop: 12, paddingHorizontal: 7}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: STYLES.lightGreenColor,
            fontFamily: 'Nunito-Bold',
            fontSize: 9,
            paddingBottom: 11,
          }}>
          SUBMITTED REQUESTS
        </Text>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{
          flexDirection: 'row',
          gap: 19,
          alignItems: 'center',
          width: '100%',
          paddingBottom: 2,
        }}>
        {headers?.map((header: any, index: any) => {
          return (
            <View
              key={index}
              style={{flex: 1 / headers.length, alignItems: 'center'}}>
              <Text
                style={{
                  color: STYLES.blackColor,
                  fontFamily: 'Nunito-ExtraBold',
                  fontSize: 7,
                  flex: 1,
                }}>
                {header}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{
          width: '100%',
          flex: 1,
        }}>
        {list?.map((item: any, index: any) => {
          return (
            <View
              key={`familyMember_${index}`}
              style={{
                flexDirection: 'row',
                flex: 1 / list.length,
                backgroundColor: index % 2 === 0 ? '#4F4F4F46' : 'white',
                overflow: 'scroll',
                gap: 19,
                alignItems: 'center',
                // justifyContent: 'center',
                paddingVertical: 10,
                paddingHorizontal: 2,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: item?.status?.color,
                    fontFamily: 'Nunito-ExtraBold',
                    fontSize: 7,
                    backgroundColor: item?.status?.bgColor,
                    borderRadius: 3,
                    textAlign: 'center',
                    // marginHorizontal: 2,
                    paddingHorizontal: 3,
                    paddingVertical: 2,
                    // ...nameTextStyle,
                  }}>
                  {item?.status?.label}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',

                  flex: 1,
                }}>
                <ImageWithInfo
                  style={{
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  image={item?.student?.image}
                  info={
                    <Text
                      style={{
                        color: STYLES.blackColor,
                        fontFamily: 'Nunito-ExtraBold',
                        fontSize: 6,
                        // ...nameTextStyle,
                      }}>
                      {item?.student?.name}
                    </Text>
                  }
                />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: STYLES.blackColor,
                    fontFamily: 'Nunito-ExtraBold',
                    fontSize: 7,
                    // ...nameTextStyle,
                  }}>
                  {item.release_date}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: STYLES.blackColor,
                    fontFamily: 'Nunito-ExtraBold',
                    fontSize: 7,
                    // ...nameTextStyle,
                  }}>
                  {item.approval_date}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: STYLES.lightGreenColor,
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                    borderRadius: 3,
                  }}
                  onPress={() => {}}>
                  <Text
                    style={{
                      color: STYLES.whiteColor,
                      fontFamily: 'Nunito-ExtraBold',
                      fontSize: 7,
                      // ...nameTextStyle,
                    }}>
                    {item.viewAction}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <DeleteIcon />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const tabs = [
  {
    title: 'SUBMITTED',
    count: 10,
    isSelected: true,
    countColor: '#FFF27D',
    titleColor: '#214C34',
    backgroundColor: '#4EB780',
    icon: <YellowColorTimer />,
    borderColor: 'black',
    renderContent: <Requests requests={allRequests} headers={headers} />,
  },
  {
    title: 'APPROVED',
    count: 9,
    isSelected: false,
    countColor: '#000000',
    titleColor: '#4EB780',
    backgroundColor: '#FFF27D',
    icon: <GreenColorTimer />,
    borderColor: 'transparent',
  },
];

// const approvedRequests = [];
