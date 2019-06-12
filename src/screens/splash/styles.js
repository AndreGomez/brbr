import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  logo: {
    marginTop: resize(223, 'height'),
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
    marginTop: resize(69, 'height'),
  }
});