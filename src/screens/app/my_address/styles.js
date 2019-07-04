import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  map: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: resize(60, 'h')
  },
  location: {
    width: resize(375),
    height: resize(54, 'h'),
    borderRadius: 6,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: resize(25),
    position: 'absolute',
    zIndex: 10000,
    marginTop: resize(25, 'h')
  },
  locationText: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.4),
    paddingLeft: resize(22),
  },
});