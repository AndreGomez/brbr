import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

//customs
import styles from './styles';

export default function Switch(props) {

  const {
    ft,
    st,
    onPress,
    active
  } = props

  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity
        onPress={onPress}
        style={
          [
            styles.btn,
            styles.left,
            active &&
            styles.active
          ]
        }
      >
        <Text
          style={
            [
              styles.text,
              active &&
              styles.activeText
            ]
          }
        >
          {ft}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress}
        style={
          [
            styles.btn,
            styles.right,
            !active &&
            styles.active
          ]
        }
      >
        <Text
          style={
            [
              styles.text,
              !active &&
              styles.activeText
            ]
          }
        >
          {st}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

Switch.defaultProps = {
  active: 0
}