import { StyleSheet } from 'react-native';

//custom
import { resize, PRIMARY_GREEN, PRIMARY_GREY, RED, width, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  button: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: resize(32),
    height: resize(54, 'height'),
    width: resize(375),
  },
  sm: {
    height: resize(54, 'height'),
    width: resize(175),
  },
  md: {
    height: resize(54, 'height'),
    width: resize(300),
  },
  icon: {
    position: 'absolute',
    left: resize(22)
  },
  iconRight: {
    right: resize(40),
    left: null
  },
  blackText: {
    color: 'black'
  },
  blueText: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '500',
    letterSpacing: resize(0.5),
  },
  blue: {
    backgroundColor: '#1877f2',
  },
  red: {
    backgroundColor: '#de4b38',
  },
  white: {
    backgroundColor: '#ffff'
  },
  primaryRed: {
    backgroundColor: RED
  },
  black: {
    backgroundColor: 'black'
  },
  bottom: {
    borderRadius: 0,
    height: resize(54, 'height'),
    width,
    // position: 'absolute',
    // top: resize((height - 214), 'height')
  },
  title: {
    fontSize: resize(16),
    //fontFamily: INTERSTATE_REGULAR,
    color: PRIMARY_GREY,
    fontSize: resize(20),
    fontWeight: '700',
    letterSpacing: resize(0.5),
  },
  raised: {
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'transparent'
  },
  raisedGreen: {
    borderColor: PRIMARY_GREEN,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'transparent'
  },
  raisedText: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '500',
    letterSpacing: resize(0.5),
  }
});