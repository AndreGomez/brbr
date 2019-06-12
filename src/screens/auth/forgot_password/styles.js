import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: resize(20)
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
    fontWeight: '500',
    fontFamily: AIRBNB_MEDIUM,
    letterSpacing: resize(0.7),
    width: resize(253),
    alignSelf: 'center',
    marginTop: resize(69, 'height')
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  btn: {
    marginTop: resize(247, 'height')
  },
  txtTouch: {
    marginTop: resize(10, 'height'),
    flexDirection: 'row',
  },
  txtTouchText: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '300',
    letterSpacing: resize(0.35),
  },
  input: {
    marginTop: resize(53, 'h')
  },
  inputBottom: {
    marginTop: resize(37, 'h')
  },
});