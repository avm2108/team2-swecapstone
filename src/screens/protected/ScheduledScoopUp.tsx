/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Layout} from './Layout';
import {CalenderIcon, CalenderScreenSampleImage} from '../../svgs';
import {STYLES} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../../components/protected/Sidebar';
import {CustomCalendar} from '../../components/general/CustomCalender';
import {Button, Dropdown} from '../../components';
import {addDocument, getDocuments} from '../../utils/firebaseFunctions';
import {useHandleTimePicker} from '../../hooks/useHandleTimePicker';
import {DateTimePicker} from '../../components/general/DateTimePicker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';


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

  const [payload, setPayload] = useState({
    name: '',
    approval_date: '',
    release_date: '',
    status: false,
    scheduled_date: '',
    scheduled_time: '',
    notes: '',
    scoop_up_person: '',
    scoop_up_method: '',
  });
  console.log(
    '🚀 ~ file: ScheduledScoopUp.tsx:61 ~ ScheduledScoopUp ~ payload:',
    payload,
  );

  const handleSubmit = async () => {
    try {
      console.log(
        '🚀 ~ file: ScheduledScoopUp.tsx:67 ~ handleSubmit ~ handleSubmit:',
      );

      const finalPrefillableData = preparePayload(payload);
      console.log(
        '🚀 ~ file: Profile.tsx:148 ~ init ~ finalPrefillableData:',
        finalPrefillableData,
      );
      const response = await addDocument({
        collectionName: 'submitted_requests',
        payload: finalPrefillableData,
      });
      console.log(
        '🚀 ~ file: ScheduledScoopUp.tsx:56 ~ handleSubmit ~ response:',
        response,
      );
      if (response) {
        Alert.alert('Status', 'Your Scoop Up is scheduled successfully', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // @ts-ignore
              navigation.navigate('Protected', {
                screen: 'SubmittedRequests',
              });
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Oops! Something went wrong');
    }
  };

  return (
    <>
      <Layout navigation={navigation} backIcon>
        <View
          style={{
            paddingTop: 29,
            paddingBottom: 12,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <TabsWithRenderContent payload={payload} setPayload={setPayload} />
        </View>
      </Layout>
      <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: STYLES.lightGreenColor,
            borderRadius: 6,
            padding: 3,
            marginHorizontal: 19,
            marginBottom: 24,
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
}

const TabsWithRenderContent = ({payload, setPayload}: any) => {
  const [scoopupMembers, setScoopupMembers] = useState([]);
  const [openScoopupMemberDropdown, setOpenScoopupMemberDropdown] =
    useState(false);
  const [scoopupMethods, setScoopupMethods] = useState([]);
  const [openScoopupMethodDropdown, setOpenScoopupMethodDropdown] =
    useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const getScoopupMembers = async () => {
      const uid = await AsyncStorage.getItem('@access_token');
      const snapshot = await firestore().collection('scoop_up_member').where('uid', '==', uid).get();

      if (!snapshot.empty) {
        const querySnapshot = snapshot.docs;
        const data: any = [];
        console.log(querySnapshot, 'querySnapshot');
        querySnapshot?.forEach(documentSnapshot => {
          data.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        const formattedResponse = data?.map((item: any) => {
          return {
            label: `${item?.first_name} ${item?.last_name}`,
            value: item?.id,
          };
        });
      setScoopupMembers(formattedResponse);
      } else {
        setScoopupMembers([]);
      }
    };

    getScoopupMembers();
  }, []);

  useEffect(() => {
    const getScoopupMethods = async () => {
      const response = await getDocuments({
        collectionName: 'scoop_up_methods',
      });

      const formattedResponse = response?.map((item: any) => {
        return {
          label: item?.label,
          value: item?.id,
        };
      });
      setScoopupMethods(formattedResponse);
    };

    getScoopupMethods();
  }, []);

  const {
    open,
    handleOpenTimer,
    handleConfirmPickDate,
    setOpen,
    selectedDate: selectedTime,
  } = useHandleTimePicker({onSelectedValidTime: () => {}});

  // const handleSelectTime = (date: any) => {
  //   console.log(
  //     '🚀 ~ file: ScheduledScoopUp.tsx:143 ~ handleSelectTime ~ date:',
  //     date,
  //   );
  //   setPayload((prevState: any) => ({
  //     ...prevState,
  //     scheduled_date: date,
  //   }));
  // };

  useEffect(() => {
    if (selectedTime) {
      setPayload((prevState: any) => ({
        ...prevState,
        scheduled_time: moment(selectedTime).format('h:mm a'),
      }));
    }
  }, [selectedTime]);

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
        <View style={{alignItems: 'center'}}>
          {/* <FullCalender /> */}
          <CustomCalendar
            onSelectDate={(date: any) => {
              console.log(
                '🚀 ~ file: ScheduledScoopUp.tsx:182 ~ TabsWithRenderContent ~ date:',
                date,
              );
              setPayload((prevState: any) => ({
                ...prevState,
                scheduled_date: date,
              }));
            }}
          />
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
          <Button
            color={STYLES.greenColor}
            wrapperStyle={{paddingHorizontal: 32}}
            title="Select Time"
            textStyles={{fontSize: 16, fontFamily: 'Nunito-Bold'}}
            onPress={() => {
              handleOpenTimer();
            }}
          />
        </View>

        <View style={{paddingBottom: 24}}>
          <Text
            style={{
              color: 'black',
              borderWidth: 1,
              width: 75,
              paddingVertical: 2,
              textAlign: 'center',
              borderRadius: 100,
            }}>
            {moment(selectedTime).format('h:mm a')}
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="Notes"
            placeholderTextColor={'grey'}
            value={notes}
            onChangeText={value => {
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
            marginBottom: 150,
          }}>
          <View style={{flex: 1 / 2}}>
            <Dropdown
              data={scoopupMembers}
              open={openScoopupMemberDropdown}
              // @ts-ignore
              setOpen={setOpenScoopupMemberDropdown}
              placeholder="Scoop-up Person"
              // @ts-ignore
              value={payload?.scoop_up_person}
              // @ts-ignore
              onSelect={(data: any) => {
                setPayload((prevState: any) => ({
                  ...prevState,
                  scoop_up_person: data?.value,
                  name: data?.label,
                }));
              }}
            />
          </View>
          <View style={{flex: 1 / 2, zIndex: 11}}>
            <Dropdown
              data={scoopupMethods}
              placeholder="Scoop-up Method"
              // @ts-ignore
              value={payload?.scoop_up_method}
              // @ts-ignore
              open={openScoopupMethodDropdown}
              // @ts-ignore
              setOpen={setOpenScoopupMethodDropdown}
              // @ts-ignore
              onSelect={(data: any) => {
                setPayload((prevState: any) => ({
                  ...prevState,
                  scoop_up_method: data?.value,
                }));
              }}
            />
          </View>
        </View>
      </View>

      <DateTimePicker
        // @ts-ignore
        onConfirm={handleConfirmPickDate}
        onCancel={() => {
          setOpen(false);
        }}
        date={selectedTime}
        modal={true}
        open={open}
        minuteInterval={30}
        minimumDate={new Date()}
      />
    </>
  );
};

function preparePayload(payload: any) {
  // Define default values for missing keys
  const defaultValues = {
    name: '',
    approval_date: '',
    release_date: '',
    status: false,
    scheduled_date: '',
    scheduled_time: '',
    notes: '',
    scoop_up_person: '',
    scoop_up_method: '',
  };

  // Iterate through the default values and add missing keys to the payload
  const updatedPayload = {...defaultValues, ...payload};

  // If the 'vehicle' key is missing in the payload, add it with default values
  if (!updatedPayload.vehicle) {
    updatedPayload.vehicle = {...defaultValues, ...payload.vehicle};
  }

  return updatedPayload;
}
