import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width: resize(375),
    height: resize(238, 'h'),
    maxHeight: 238,
    borderRadius: 12,
    borderColor: '#2d2d2d',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  barber: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
  },
  top: {
    paddingHorizontal: resize(15),
    paddingVertical: resize(14, 'h'),
    borderColor: '#2d2d2d',
    borderStyle: 'solid',
    borderBottomWidth: 2,
  },
  name: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '700',
  },
  stars: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '700',
  },
  txtTouch: {
    textDecorationLine: 'underline',
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: '500',
  },
  city: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: '500',
  },
  payment: {
    color: '#95989a',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(18),
    fontWeight: '500',
  },
  topHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  avatar: {
    width: resize(50, 'h'),
    height: resize(50, 'h'),
    borderRadius: resize(25, 'h'),
    marginRight: resize(12)
  },
  topHeaderContent: {
    flexDirection: 'row',
    marginTop: resize(10, 'h'),
    alignItems: 'center'
  },
  starContent: {
    marginTop: resize(10, 'h'),
    alignItems: 'flex-end',

  },
  asap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: resize(5, 'h'),
  },
  bottom: {
    paddingHorizontal: resize(15),
    paddingVertical: resize(14, 'h'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});