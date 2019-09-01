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
    width,
    textAlign: 'center',
  },
  code: {
    color: PRIMARY_GREEN,
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(42),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    width,
    textAlign: 'center',
    paddingTop: resize(10, 'h')
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: resize(600, 'h')
  }
});