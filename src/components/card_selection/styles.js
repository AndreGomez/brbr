import { StyleSheet } from 'react-native';

//utils
import { resize, PRIMARY_GREEN, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#5c5c5c',
    width: resize(375),
    height: resize(219, 'h'),
    maxHeight: 219,
  },
  mCard: {
    marginTop: resize(15, 'h')
  },
  cardEmty: {
    width: resize(375),
    height: resize(219, 'h'),
    maxHeight: 219,
    borderRadius: 12,
    borderColor: '#95989a',
    borderStyle: 'dashed',
    borderWidth: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusIcon: {
    height: resize(64),
    width: resize(64)
  },
  headerContainer: {
    flexDirection: 'row'
  },
  leftHeader: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(26),
    fontWeight: '700',
    letterSpacing: resize(0.65),
  },
  titleHeader: {
    width: '50%'
  },
  rightHeader: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(26),
    fontWeight: '700',
    letterSpacing: resize(0.65),
    textAlign: 'right',
  },
  nameLabel: {
    color: '#ffffff',
    fontFamily: 'Arial',
    fontSize: resize(10),
    fontWeight: '700',
    letterSpacing: resize(0.2),
    paddingTop: resize(36, 'h'),
  },
  cardBody: {
    paddingHorizontal: resize(26),
    paddingTop: resize(20),
  },
  name: {
    color: '#ffffff',
    //fontFamily: 'Cousine',
    fontSize: resize(18),
    fontWeight: '400',
    letterSpacing: resize(0.99),
    paddingTop: resize(9, 'h'),
  },
  active: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: resize(21, 'h'),
  },
  activeTxt: {
    color: PRIMARY_GREEN,
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '700',
    letterSpacing: resize(0.35),
    paddingRight: resize(11)
  },
  activeIcon: {
    width: resize(24),
    height: resize(29),
  }
});