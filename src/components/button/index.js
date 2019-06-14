import React from 'react';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';

//custom
import styles from './styles';

export default function MainButton(props) {

  const {
    text,
    onPress,
    loading,
    icon,
    iconRight,
    raised_white,
    blue,
    red,
    raised_green,
    sm,
    md,
    white,
    primary_red,
    black,
    bottom,
    xsRaisedGreen
  } = props

  return (
    <Button
      icon={
        icon &&
        <Image
          style={
            [
              styles.icon,
              iconRight && styles.iconRight,
              xsRaisedGreen && styles.iconRightXs
            ]
          }
          source={icon}
        />
      }
      iconRight={iconRight}
      titleStyle={
        [
          styles.title,
          raised_white && styles.raisedText,
          raised_green && styles.raisedText,
          blue && styles.blueText,
          red && styles.blueText,
          primary_red && styles.blackText,
          black && styles.blueText,
          xsRaisedGreen && styles.xsText,
          xsRaisedGreen && styles.greenText
        ]
      }
      loading={loading}
      containerStyle={props.containerStyle}
      buttonStyle={
        [
          styles.button,
          props.buttonStyle,
          raised_white && styles.raised,
          blue && styles.blue,
          red && styles.red,
          raised_green && styles.raisedGreen,
          sm && styles.sm,
          md && styles.md,
          xsRaisedGreen && styles.xs,
          xsRaisedGreen && styles.raisedGreen,
          white && styles.white,
          primary_red && styles.primaryRed,
          black && styles.black,
          bottom && styles.bottom
        ]
      }
      title={text}
      onPress={onPress}
    />
  );
}

MainButton.defaultProps = {
  onPress: () => { },
  icon: null,
  iconRight: null,
  loading: false,
  title: 'Button',
  buttonStyle: styles.button,
  containerStyle: {}
}