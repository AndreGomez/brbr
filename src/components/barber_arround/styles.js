import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    height: resize(100, 'h'),
    flexDirection: 'row',
    paddingTop: resize(15, 'h')
  },
  img: {
    width: resize(65),
    height: resize(65),
    borderRadius: resize(32.5),
  },
  txtContainer: {
    paddingLeft: resize(12),
  },
  name: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
    letterSpacing: resize(0.45),
    width: resize(136)
  },
  addres: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: '500',
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
    fontWeight: '700',
    letterSpacing: resize(0.5),
    paddingRight: resize(4)
  },
  starIcon: {
    width: resize(18),
    height: resize(18),
  },
  priceContainer: {
    width: resize(157),
    alignItems: 'flex-end',
  },
  cash: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(12),
    fontWeight: '700',
  },
  price: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '700',
    letterSpacing: resize(0.35),
  },
  btn: {
    marginTop: resize(10, 'h')
  }
});