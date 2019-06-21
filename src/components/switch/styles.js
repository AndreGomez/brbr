import { StyleSheet } from 'react-native';
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: resize(54, 'h'),
    flexDirection: 'row',
  },
  btn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  active: {
    backgroundColor: 'white',
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '500',
  },
  activeText: {
    color: '#000000',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '500',
  },
  left: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  right: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  }
});