import { StyleSheet } from 'react-native';

//custom
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';


export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    marginRight: resize(12)
  },
  text: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
    letterSpacing: resize(0.45),
  },
});