/* eslint-disable react-native/no-inline-styles */
import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {STYLES} from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function CustomImage({imageUrl, imageStyles = {}}: any) {
  const [isValidUrl, setIsValidUrl] = useState(true);

  // Function to check if the image URL is valid
  const checkImageExists = async () => {
    try {
      const response = await fetch(imageUrl);
      setIsValidUrl(response.ok);
    } catch (error) {
      setIsValidUrl(false);
    }
  };

  useEffect(() => {
    checkImageExists();
  }, []);
  return (
    <View>
      {imageUrl && isValidUrl ? (
        <Image
          source={{uri: imageUrl}}
          style={{height: 30, width: 30, ...imageStyles}}
        />
      ) : (
        <MaterialCommunityIcons
          name="account"
          color={STYLES.greenColor}
          size={imageStyles?.width ? imageStyles?.width : 30}
        />
      )}
    </View>
  );
}
