import { StyleSheet, Platform } from 'react-native';
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width: '100%'
  },
  avatar: {
    width: resize(64, 'h'),
    height: resize(64, 'h'),
    borderRadius: resize(32, 'h'),
    borderColor: '#707070',
    borderWidth: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  alert: {
    color: 'red',
    paddingRight: resize(20)
  },
  name: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(24),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  textLbl: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  txtContainer: {
    marginLeft: resize(15)
  },
  txt: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  version: {
    color: '#707070',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  active: {
    color: '#94ffb4',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  inUse: {
    color: '#94ffb4',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    paddingRight: resize(20),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  desactive: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
});