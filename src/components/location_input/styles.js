import { StyleSheet, Platform } from 'react-native';

//custom
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    width: '100%',
    alignItems: 'center',
    zIndex: 10000000
  },
  input: {
    width: '100%',
    height: '100%',
    paddingLeft: resize(10),
    // fontFamily: INTERSTATE_REGULAR,
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.4),
  },
  list: {
    width: resize(375),
    marginTop: resize(5, 'h'),
    backgroundColor: 'white',
    paddingHorizontal: resize(10),
    paddingBottom: resize(10, 'h'),
    borderRadius: 6,
    position: 'absolute',
    zIndex: 1000000000000
  },
  label: {
    color: '#000000',
    // fontFamily: INTERSTATE_REGULAR,
    fontSize: resize(12, 'height'),
    alignSelf: 'center',
    marginTop: resize(15, 'height'),
    // color: INPUT_TEXT_COLOR,
    width: '100%'
  },
  touch: {
    width: resize(375),
  }
});