import { StyleSheet } from 'react-native';

//utils
import { resize, TERTIARY_GREY, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  content: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: resize(20)
  },
  container: {
    backgroundColor: 'black',
  },
  btnContainer: {
    flexDirection: 'row',
    marginHorizontal: resize(20),
    justifyContent: 'space-between',
    width: '100%'
  },
  cameraText: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
    letterSpacing: resize(0.45),
    paddingRight: resize(37)
  },
  cameraContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end'
  },
  icon: {
    marginTop: resize(85, 'h'),
    width: resize(56),
    height: resize(56)
  },
  title: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(32),
    fontWeight: '700',
    letterSpacing: resize(0.8),
    marginTop: resize(42, 'h'),
  },
  label: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
    letterSpacing: resize(0.45),
    textAlign: 'center',
    marginTop: resize(26, 'h'),
    paddingHorizontal: resize(80)
  },
  label2: {
    paddingHorizontal: resize(50)
  }
});