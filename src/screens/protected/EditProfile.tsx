/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Layout} from './Layout';
import {MotherSampleImageMedium} from '../../svgs';
import {STYLES} from '../../constants/styles';
import {Card} from '../../components/general/Card';
import {useNavigation} from '@react-navigation/native';
import {familyList} from '../../lib/profileMockData';
import {TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function EditProfileWithDrawer({route}: any) {
  return <Profile info={route?.params?.data} />;
}

function Profile({info}: any) {
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
        <ParentCard />
        <PersonalInformation info={info} />
        <FamilyInformation />
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

const PersonalInformation = ({info}: any) => {
  const [prefilledData, setPrefilledData] = useState(() => info);

  useEffect(() => {
    setPrefilledData(info);
  }, [info]);

  const handleChange = (path: any, valueInput: any) => {
    const value = valueInput.nativeEvent.text;
    setPrefilledData((prevState: any) => {
      const newState = {...prevState};
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

  const handleSave = () => {
    const docRef = firestore().collection('person').doc(info?.id);
    delete prefilledData?.id;
    docRef.update(prefilledData).then((result: any) => {
      console.log('Success', result);
    });

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
        <TouchableOpacity onPress={handleSave}>
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
            style={{flex: 1 / 2}}
            title={'Phone Number'}
            handleChange={(value: string) => handleChange('phone', value)}
            inputFieldValue={prefilledData?.phone}
          />
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Vehicle Make/Model'}
            handleChange={(value: any) =>
              handleChange('vehicleInfo.vehicle_model.value', value)
            }
            inputFieldValue={prefilledData?.vehicleInfo?.vehicle_model?.value}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Email Address'}
            handleChange={(value: string) => handleChange('email', value)}
            inputFieldValue={prefilledData?.email}
          />
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Vehicle Year'}
            handleChange={(value: string) =>
              handleChange('vehicleInfo.vehicle_year.value', value)
            }
            inputFieldValue={prefilledData?.vehicleInfo?.vehicle_year?.value}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Gender'}
            handleChange={(value: string) => handleChange('gender', value)}
            inputFieldValue={prefilledData?.gender}
          />
          <TitleWithInputField
            style={{flex: 1 / 2}}
            title={'Vehicle Color'}
            handleChange={(value: any) =>
              handleChange('vehicleInfo.vehicle_color.value', value)
            }
            inputFieldValue={prefilledData?.vehicleInfo?.vehicle_color?.value}
          />
        </View>
      </View>
    </Card>
  );
};

const TitleWithInputField = ({
  title,
  style = {},
  titleStyle = {},
  handleChange = () => {},
  inputFieldValue = '',
}: any) => {
  return (
    <View style={{...style}}>
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
        onChange={handleChange}
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
        value={inputFieldValue}
      />
      {/* <Text style={{color: STYLES.greenColor, fontSize: 6, ...inputFieldStyle}}>
        {inputFieldValue}
      </Text> */}
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
