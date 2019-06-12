import React from 'react';
import { Image, View } from 'react-native';

//custom
import styles from './styles';
import LogoImage from '../../assets/images/logo.png';

export default function Logo(props) {

  const { imageContainerStyles } = props;

  return (
    <View
      style={imageContainerStyles}
    >
      <Image
        style={styles.image}
        source={LogoImage}
        resizeMode='contain'
      />
    </View>
  );
}