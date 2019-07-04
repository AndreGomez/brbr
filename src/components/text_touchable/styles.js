import { StyleSheet, Platform } from 'react-native';

//custom
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    borderColor: 'white',
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: resize(20),
    height: resize(25),
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.5),
  }
});