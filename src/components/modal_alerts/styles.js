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
  btn: {
    marginTop: resize(33, 'h'),
  },
  bottom: {
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    height: resize(348, 'height'),
    width,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: resize(52, 'height')
  }
});