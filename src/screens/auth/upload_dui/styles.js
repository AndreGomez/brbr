import { StyleSheet, Platform } from 'react-native';

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
    width: '100%',
    marginTop: resize(60, 'h')
  },
  btnContainerNoParams: {
    flexDirection: 'row',
    marginHorizontal: resize(20),
    justifyContent: 'center',
    width: '100%',
    marginTop: resize(60, 'h')
  },
  cameraText: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
    paddingRight: resize(37)
  },
  cameraContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end'
  },
  img: {
    height: resize(120, 'h'),
    width: '100%',
    marginTop: resize(15, 'h')
  },
  icon: {
    marginTop: resize(35, 'h'),
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
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
    textAlign: 'center',
    marginTop: resize(20, 'h'),
    paddingHorizontal: resize(20)
  },
  label2: {
    paddingHorizontal: resize(50)
  },
  empty_img: {
    marginVertical: resize(50, 'h')
  }
});