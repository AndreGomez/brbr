import React from 'react';
import { View } from 'react-native';
import { Spinner } from 'native-base';

//customs
import styles from './styles';

export default function Loading(props) {

  return (
    <View style={styles.container}>
      <Spinner
        color={props.color}
      />
    </View>
  );
}

Loading.defaultProps = {
  color: styles.spinner.color
}