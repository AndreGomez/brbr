import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width: resize(225),
    height: resize(100, 'h'),
    borderRadius: 12,
    backgroundColor: '#2d2d2d',
    marginRight: resize(12),
    paddingHorizontal: resize(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  horizontal: {
    width: resize(375),
    height: resize(63, 'h'),
    borderRadius: 12,
    backgroundColor: '#2d2d2d',
    paddingHorizontal: resize(15),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: resize(10, 'h')
  },
  img: {
    width: resize(65),
    height: resize(65),
    borderRadius: resize(32.5),
    backgroundColor: '#2d2d2d',
  },
  imgH: {
    width: resize(50),
    height: resize(50),
    borderRadius: resize(25),
    backgroundColor: '#2d2d2d',
  },
  txtContainer: {
    paddingLeft: resize(12),
  },
  name: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
    width: resize(136)
  },
  addres: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.4),
    width: resize(140)
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.5),
    paddingRight: resize(4)

  },
  starIcon: {
    width: resize(18),
    height: resize(18),
  },
});