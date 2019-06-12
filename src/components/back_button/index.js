import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

//custom
import styles from './styles';
import BackIcon from '../../assets/icons/back.png';

export default function BackButton(props) {

  const {
    onPress,
    icon
  } = props;

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={onPress}
    >
      <Image
        resizeMode='contain'
        style={styles.icon}
        source={icon}
      />
    </TouchableOpacity>
  );
}

BackButton.defaultProps = {
  onPress: () => { },
  icon: BackIcon
}