import React from 'react';
import { SafeAreaView, View } from 'react-native';

//custom
import styles from './styles';
import { resize } from '../../utils/styles';

export default function CustomHeader(props) {

  const {
    left,
    center,
    right,
    backgroundColor,
    height
  } = props;

  return (
    <SafeAreaView>
      <View
        style={
          [
            styles.header,
            {
              height: resize(height, 'height'),
              backgroundColor: backgroundColor ? backgroundColor : null
            }
          ]
        }
      >
        <View style={styles.left}>
          {left}
        </View>
        <View style={styles.center}>
          {center}
        </View>
        <View style={styles.right}>
          {right}
        </View>
      </View>
    </SafeAreaView>
  );
}

CustomHeader.defaultProps = {
  left: null,
  right: null,
  center: null,
  height: 49
}