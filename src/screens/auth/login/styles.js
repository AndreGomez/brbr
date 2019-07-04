import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  logo: {
    marginTop: resize(108, 'height'),
    alignSelf: 'center',
    width: resize(106),
    height: resize(41, 'height')
  },
  slogan: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: resize(28),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontFamily: AIRBNB_MEDIUM,
    letterSpacing: resize(0.7),
    width: resize(300),
    alignSelf: 'center',
    marginTop: resize(69, 'height')
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: resize(96, 'height')
  },
  btn: {
    marginTop: resize(30, 'height')
  },
  txtTouch: {
    marginTop: resize(42, 'height')
  }
});