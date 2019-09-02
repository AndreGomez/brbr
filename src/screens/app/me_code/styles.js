import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM, height, PRIMARY_GREEN, width } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  codeInfo: {
    color: 'white',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(22),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    width: '100%',
    paddingTop: resize(80, 'h'),
    textAlign: 'center',
  },
  percentage: {
    color: PRIMARY_GREEN,
    fontSize: resize(25),
  },
  readyExistCode: {
    color: 'white',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(22),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    width: '100%',
    paddingTop: resize(80, 'h'),
    textAlign: 'center',
  },
  save: {
    color: '#94ffb4',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingRight: resize(20)
  },
  code: {
    color: PRIMARY_GREEN,
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(42),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    width: '100%',
    textAlign: 'center',
    paddingTop: resize(10, 'h')
  },
  content: {
    flex: 1,
    paddingHorizontal: resize(30),
    paddingTop: resize(30, 'h')
  }
});