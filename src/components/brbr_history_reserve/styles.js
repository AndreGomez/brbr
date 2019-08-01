import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: resize(100, 'h'),
    maxHeight: 100,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  avatar: {
    width: resize(65),
    height: resize(65),
    borderRadius: resize(65) / 2,
  },
  row: {
    flexDirection: 'row',
  },
  name: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '700',
  },
  city: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingTop: resize(5),
    width: resize(210)
  },
  date: {
    paddingTop: resize(10),
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '300',
  },
  stars: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: '700',
  },
  money: {
    color: '#94ffb4',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '700',
  },
  efecti: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '400',
    paddingTop: resize(25)
  },
  txtCont: {
    paddingLeft: resize(13)
  },
  starCont: {
  }
});