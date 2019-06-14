import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: resize(74, 'h')
  },
  icon: {
    width: resize(147),
    height: resize(142)
  },
  title: {
    color: '#000000',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(32),
    fontWeight: '700',
    letterSpacing: resize(0.8),
    paddingTop: resize(45, 'h'),
    textAlign: 'center'
  },
  message: {
    width: resize(357),
    height: resize(117, 'h'),
    color: '#000000',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(20),
    fontWeight: '500',
    letterSpacing: resize(0.5),
    textAlign: 'center',
    marginTop: resize(51, 'h'),
  },
  btnContainer: {
    position: 'absolute',
    bottom: resize(36, 'h'),
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  chip: {
    width: resize(12),
    height: resize(12),
    borderRadius: 1000,
    alignSelf: 'center',
    marginRight: resize(20),
  },
  active: {
    backgroundColor: '#000000',
  },
  disable: {
    backgroundColor: '#cfcfcf',
  },
  btn: {
    alignSelf: 'flex-end'
  },
  left: {
    flexDirection: 'row',
    width: '50%',
    paddingLeft: resize(45),
  },
  right: {
    width: '50%',
    paddingRight: resize(20),
  }
});