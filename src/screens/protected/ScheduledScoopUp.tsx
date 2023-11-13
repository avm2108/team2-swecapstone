/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Layout} from './Layout';
import {
  CalenderIcon,
  CalenderScreenSampleImage,
  DeleteIcon,
  FullCalender,
  GreenColorTimer,
  TimeDummyUI,
  YellowColorTimer,
} from '../../svgs';
import {STYLES} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../../components/protected/Sidebar';
import {allRequests, headers} from '../../utils/mockData';

const Drawer = createDrawerNavigator();

export default function ScheduledScoopUpWithDrawer({navigation}: any) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}
      id="ScheduledScoopUpDrawer"
      drawerContent={(props: any) => {
        return (
          <SideBar
            id="ScheduledScoopUpDrawer"
            navigation={navigation}
            {...props}
          />
        );
      }}>
      <Drawer.Screen
        name="ScheduledScoopUpWithDrawer"
        component={ScheduledScoopUp}
      />
    </Drawer.Navigator>
  );
}

function ScheduledScoopUp() {
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
  const [notes, setNotes] = useState('');
  const [scoopUpPerson, setScoopUpPerson] = useState('');
  const [scoopUpMethod, setScoopUpMethod] = useState('');

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          gap: 7,
          paddingHorizontal: 24,
          paddingBottom: 12,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <View>
          <CalenderIcon />
        </View>
        <View>
          <Text
            style={{
              color: STYLES.blackColor,
              fontSize: 16,
              textAlign: 'center',
            }}>
            Schedule Scoop Up
          </Text>
          <Text
            style={{
              color: STYLES.greenColor,
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            Son
          </Text>
        </View>
        <View style={{gap: 2, alignItems: 'center'}}>
          <CalenderScreenSampleImage />
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                color: STYLES.lightGreenColor,
                fontSize: 7,
                textAlign: 'center',
              }}>
              Change Profile{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: '100%',
          borderBottomColor: '#FFF27D',
          borderBottomWidth: 2,
        }}
      />
      <View
        style={{
          backgroundColor: STYLES.lightGreenColor,
          borderRadius: 6,
          padding: 3,
          marginHorizontal: 24,
          marginTop: 12,
        }}>
        <Text
          style={{
            color: STYLES.whiteColor,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'Nunito-Regular',
          }}>
          Select the date and the time:
        </Text>
      </View>

      <View style={{paddingHorizontal: 13}}>
        <Text
          style={{
            color: STYLES.greenColor,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'Nunito-Bold',
            paddingVertical: 12,
          }}>
          FEBRUARY
        </Text>
        <View style={{alignItems: 'center'}}>
          <FullCalender />
        </View>
        <View>
          <Text
            style={{
              color: STYLES.lightGreenColor,
              fontSize: 14,
              fontFamily: 'Nunito-SemiBold',
              paddingBottom: 12,
              paddingTop: 16,
            }}>
            Choose scoop-up time:
          </Text>
        </View>
        <View style={{paddingBottom: 24}}>
          <TimeDummyUI />
        </View>
        <View>
          <TextInput
            placeholder="Notes"
            placeholderTextColor={'grey'}
            value={notes}
            onChange={value => {
              setNotes(value);
            }}
            style={{
              height: 60,
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 3,
              fontFamily: 'Nunito-SemiBold',
              color: 'black',
              fontSize: 13,
              paddingHorizontal: 10,
            }}
            multiline
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 14,
            gap: 24,
          }}>
          <View style={{flex: 1 / 2}}>
            <TextInput
              placeholder="Scoop-up Person"
              placeholderTextColor={'grey'}
              value={scoopUpPerson}
              onChange={value => {
                setScoopUpPerson(value);
              }}
              style={{
                height: 30,
                paddingVertical: 0,
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 3,
                fontFamily: 'Nunito-SemiBold',
                color: 'black',
                fontSize: 13,
                paddingHorizontal: 10,
                width: '100%',
              }}
            />
          </View>
          <View style={{flex: 1 / 2}}>
            <TextInput
              placeholder="Scoop-up Method"
              placeholderTextColor={'grey'}
              value={scoopUpMethod}
              onChange={value => {
                setScoopUpMethod(value);
              }}
              style={{
                height: 30,
                paddingVertical: 0,
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 3,
                fontFamily: 'Nunito-SemiBold',
                color: 'black',
                fontSize: 13,
                paddingHorizontal: 10,
                width: '100%',
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: STYLES.lightGreenColor,
            borderRadius: 6,
            padding: 3,
            // marginHorizontal: 24,
            marginTop: 12,
          }}>
          <Text
            style={{
              color: STYLES.whiteColor,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'Nunito-Bold',
            }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
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
