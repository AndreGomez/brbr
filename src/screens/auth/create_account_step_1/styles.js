import { StyleSheet } from 'react-native';

//utils
import { resize, TERTIARY_GREY, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  logo: {
    marginTop: resize(86, 'height'),
    alignSelf: 'center',
    width: resize(106),
    height: resize(41, 'height')
  },
  slogan: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: resize(28),
    fontWeight: '500',
    letterSpacing: resize(0.7),
    width: resize(243),
    alignSelf: 'center',
    marginTop: resize(66, 'height')
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: resize(64, 'height')
  },
  qote: {
    color: TERTIARY_GREY,
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
    letterSpacing: resize(0.45),
    width: resize(280),
    height: resize(88, 'height'),
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: resize(51, 'height')
  },
  btn: {

  },
  txtTouch: {
    marginLeft: resize(5)
  },
  loginContainer: {
    flexDirection: 'row',
    width: resize(351),
    alignSelf: 'center',
    marginTop: resize(128, 'height'),
  },
  readyAccount: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '500',
    letterSpacing: resize(0.5),
  }
});