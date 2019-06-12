import React from 'react';
import { Text, TouchableOpacity } from 'react-native'

//custom
import styles from './styles';

export default function TextTouchable(props) {

  const {
    text,
    onPress,
    customStyle
  } = props;

  return (
    <TouchableOpacity
      style={
        [
          styles.container,
          customStyle && customStyle,
        ]
      }
      onPress={onPress}
    >
      <Text
        style={props.textStyle}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

TextTouchable.defaultProps = {
  text: '',
  textStyle: styles.text,
  onPress: () => { },
  customStyle: {}
}