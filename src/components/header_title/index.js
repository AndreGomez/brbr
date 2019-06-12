import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

//custom
import styles from './styles';

export default function HeaderTitle(props) {

  const {
    text,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    </View>
  );
}

HeaderTitle.defaultProps = {
  text: ''
}