/* eslint-disable react-native/no-inline-styles */
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Layout } from './Layout';
import { STYLES } from '../../constants/styles';
import { Card } from '../../components/general/Card';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { ParentCard } from './Settings';
import { addDocument, updateDocument } from '../../utils/firebaseFunctions';
import { CustomImage } from '../../components/general/CustomImage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditProfileWithDrawer({ route }: any) {
  return <Profile info={route?.params?.data} />;
}

function Profile({ info }: any) {
  const navigation = useNavigation();
  return (
    <Layout navigation={navigation} backIcon={true}>
      <View
        style={{
          paddingTop: 29,
          paddingBottom: 12,
          paddingHorizontal: 25,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View style={{ alignItems: 'center', paddingBottom: 12 }}>
          <ParentCard />
        </View>

        <PersonalInformation info={info} />
        <FamilyListHorizontalInformation />
      </View>
    </Layout>
  );
}

const ImageWithInfo = ({ direction = 'row', image, info, style }: any) => {
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
            fontFamily: 'Nunito-Bold',
            fontSize: 12,
            ...nameTextStyle,
          }}>
          {name}
        </Text>
        <Text
          style={{
            color: STYLES.greenColor,
            fontSize: 6,
            ...relationTextStyle,
            fontFamily: 'Nunito-Bold',
          }}>
          {relation}
        </Text>
      </View>
    </>
  );
};

const PersonalInformation = ({ info }: any) => {
  console.log(
    '🚀 ~ file: EditProfile.tsx:89 ~ PersonalInformation ~ info:',
    info,
  );
  const [prefilledData, setPrefilledData] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    setPrefilledData(info);
  }, [info]);

  const handleChange = (path: any, value: any) => {
    setPrefilledData((prevState: any) => {
      const newState = { ...prevState };
      const keys = path?.split('.');

      if (keys?.length === 1) {
        // Update a top-level property
        newState[keys?.[0]] = value;
      } else {
        // Update a nested property
        let current = newState;
        for (let i = 0; i < keys?.length - 1; i++) {
          current = current[keys?.[i]];
        }
        current[keys[keys?.length - 1]] = value;
      }

      return newState;
    });
  };

  const handleSaveOrUpdate = async () => {
    try {
      const currentPersonId = info?.uid;

      if (!currentPersonId) {
        // Handle the case where the user is not logged in
        console.log('User not logged in');
        return;
      }
      if (currentPersonId) {
        const snapshot = await firestore()
          .collection('users')
          .where('uid', '==', currentPersonId)
          .get();
        if (!snapshot.empty) {
          // Assuming you only want one record; if there are multiple, you might need to iterate over the docs
          const docId = snapshot.docs[0].id;
          console.log('doc id ***', docId);
          const updatedResponse = await updateDocument({
            collectionName: 'users',
            payload: prefilledData,
            docId: docId,
          });

          if (updatedResponse) {
            Alert.alert('Profile Updated Successfully');
            navigation.canGoBack() ? navigation.goBack() : null;
          }
          return;
        } else {
          Alert.alert('No User found ... Please logout and login again');
          return;
        }
      } else {
        Alert.alert('No User found ... Please logout and login again');
      }
      const response = await addDocument({
        collectionName: 'person',
        payload: prefilledData,
      });
      if (response) {
        Alert.alert('Profile Added Successfully');
        return navigation.canGoBack() ? navigation.goBack() : null;
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <Card
      style={{
        paddingTop: 19,
        paddingLeft: 13,
        paddingRight: 29,
        marginTop: 15,
        paddingBottom: 27,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: STYLES.greenColor,
            fontFamily: 'Nunito-Bold',
            fontSize: 12,
          }}>
          Personal Information
        </Text>
        <TouchableOpacity onPress={handleSaveOrUpdate}>
          <Text
            style={{
              color: STYLES.greenColor,
              fontFamily: 'Nunito-Bold',
              fontSize: 8,
              textDecorationLine: 'underline',
            }}>
            Save
          </Text>
        </TouchableOpacity>
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
          <TitleWithInputField
            style={{ flex: 1 / 2 }}
            title={'Phone Number'}
            keyboardType={'numeric'}
            // maxLength={10}
            handleChange={(value: string) => handleChange('phone', value)}
            inputFieldValue={prefilledData?.phone}
          />
          <TitleWithInputField
            style={{ flex: 1 / 2 }}
            title={'Vehicle Make/Model'}
            handleChange={(value: any) => handleChange('vehicle.model.value', value)}
            inputFieldValue={prefilledData?.vehicle?.model?.value}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithInputField
            style={{ flex: 1 / 2 }}
            title={'Email Address'}
            handleChange={(value: string) => handleChange('email', value)}
            inputFieldValue={prefilledData?.email}
          />
          <TitleWithInputField
            style={{ flex: 1 / 2 }}
            title={'Vehicle Year'}
            handleChange={(value: string) =>
              handleChange('vehicle.year.value', value)
            }
            keyboardType="numeric"
            inputFieldValue={prefilledData?.vehicle?.year?.value}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithInputField
            style={{ flex: 1 / 2 }}
            title={'Gender'}
            handleChange={(value: string) => handleChange('gender', value)}
            inputFieldValue={prefilledData?.gender}
          />
          <TitleWithInputField
            style={{ flex: 1 / 2 }}
            title={'Vehicle Color'}
            handleChange={(value: any) => handleChange('vehicle.color.value', value)}
            inputFieldValue={prefilledData?.vehicle?.color?.value}
          />
        </View>
      </View>
    </Card>
  );
};

export const TitleWithInputField = ({
  title,
  style = {},
  titleStyle = {},
  handleChange = () => { },
  inputFieldValue = '',
  maxLength,
  keyboardType,
}: any) => {
  return (
    <View style={{ ...style }}>
      <Text
        style={{
          color: STYLES.blackColor,
          fontFamily: 'Nunito-Bold',
          fontSize: 8,
          ...titleStyle,
        }}>
        {title}
      </Text>
      <TextInput
        onChangeText={handleChange}
        style={{
          paddingHorizontal: 7,
          height: 18,
          paddingVertical: 0,
          fontSize: 6,
          fontFamily: 'Nunito-Bold',
          marginRight: 10,
          borderRadius: 4,
          marginTop: 7,
          color: STYLES.lightGreenColor,
          backgroundColor: STYLES.veryLightGrayColor,
        }}
        maxLength={maxLength}
        value={inputFieldValue}
        keyboardType={keyboardType}
      />
      {/* <Text style={{color: STYLES.greenColor, fontSize: 6, ...inputFieldStyle}}>
        {inputFieldValue}
      </Text> */}
    </View>
  );
};

export const FamilyListHorizontalInformation = () => {
  const [familyList, setFamilyList] = useState<any>([]);
  useEffect(() => {
    const init = async () => {
      const uid = await AsyncStorage.getItem('@access_token')
      const snapshot = await firestore().collection('scoop_up_member').where('uid', '==', uid).get();

      if (!snapshot.empty) {
        const querySnapshot = snapshot.docs;
        const data: any = [];
        console.log(querySnapshot, 'querySnapshot');
        querySnapshot?.forEach(documentSnapshot => {
          data.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        setFamilyList(data);
      } else {
        setFamilyList([])
      }
    };
    init();
  }, []);

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
        {familyList?.map((familyMember: any, index: any) => {
          return (
            <ImageWithInfo
              key={`familyMember_${index}`}
              style={{
                gap: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              direction="column"
              image={
                <CustomImage imageUrl={familyMember?.user_picture} />
              }
              info={
                <PersonInfo
                  name={familyMember?.first_name}
                  relation={familyMember?.child_relation}
                  relationTextStyle={{ textAlign: 'center' }}
                />
              }
            />
          );
        })}
      </View>
    </Card>
  );
};
