import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

//customs
import styles from './styles';

//iconc
import starIcon from '../../assets/icons/star.png';

export default function BarberVip(props) {

  const {
    img,
    addres,
    stars,
    name,
    onPressBarberVip
  } = props

  return (
    <TouchableOpacity
      onPress={onPressBarberVip}
      style={styles.container}
    >
      <Image
        source={{ uri: img }}
        style={styles.img}
      />
      <View
        style={styles.txtContainer}
      >
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          style={styles.addres}
          numberOfLines={1}
        >
          {addres}
        </Text>
        <View
          style={styles.starContainer}
        >
          <Text
            style={styles.starText}
          >
            {stars}
          </Text>
          <Image
            style={styles.starIcon}
            source={starIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

BarberVip.defaultProps = {
  img: '',
  addres: '',
  stars: 0,
  name: ''
}