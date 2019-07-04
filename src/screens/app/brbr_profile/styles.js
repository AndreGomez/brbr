import { StyleSheet, Platform } from 'react-native';

//utils
import {
  resize,
  AIRBNB_MEDIUM,
} from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    paddingHorizontal: resize(20)
  },
  portraitBack: {
    width: '100%',
    height: resize(200, 'h'),
  },
  vipIcon: {
    marginRight: resize(20)
  },
  portraitBack: {
    width: '100%',
    height: resize(200, 'h'),
    position: 'absolute',
    top: 0,
    zIndex: -10
  },
  portraitBackFront: {
    width: '100%',
    height: resize(200, 'h'),
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    zIndex: -10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(24),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingTop: resize(30, 'h')
  },
  city: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  stars: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(27),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  lbl: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  avatar: {
    width: resize(80, 'h'),
    height: resize(80, 'h'),
    borderRadius: resize(40, 'h'),
    marginTop: resize(-85, 'h')
  },
  interSection: {
    width: '100%',
    height: resize(117, 'h'),
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? resize(100, 'h') : resize(135, 'h'),
  },
  section: {
    width: '33.33333%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  switch: {
    paddingHorizontal: resize(20)
  }
});