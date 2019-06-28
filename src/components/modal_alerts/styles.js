import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM, width } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  bottomContainer: {
    alignItems: 'flex-end',
  },
  content: {
    borderRadius: 12,
    backgroundColor: 'white',
    height: resize(350, 'height'),
    width: resize(350),
    maxHeight: 350,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: resize(52, 'height')
  },
  phoneNumber: {
    height: resize(422, 'height'),
    maxHeight: 422,
  },
  closeBtn: {
    right: resize(21),
    top: resize(16, 'h'),
    position: 'absolute',
  },
  message: {
    color: '#4a4a4a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
    letterSpacing: resize(0.45),
    textAlign: 'center',
    marginTop: resize(38, 'h'),
    paddingHorizontal: resize(20)
  },
  btnPhone: {
    textDecorationLine: 'underline',
    marginTop: resize(20, 'h'),
    color: '#4a4a4a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '700',
  },
  btn: {
    marginTop: resize(33, 'h'),
  },
  input: {
    width: resize(250),
    height: resize(54, 'h'),
    maxHeight: 54,
    borderRadius: 12,
    backgroundColor: '#000000',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(24),
    fontWeight: '500',
    color: 'white',
    marginTop: resize(10, 'h'),
    textAlign: 'center'
  },
  bottom: {
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    height: resize(348, 'height'),
    width,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: resize(52, 'height')
  },
  subtitle: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
    marginTop: resize(25, 'h')
  }
});