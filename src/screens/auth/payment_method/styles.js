import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, TERTIARY_GREY, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  title: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '300',
    letterSpacing: resize(0.35),
    width: '100%',
    textAlign: 'center',
    paddingVertical: resize(15, 'h')
  },
  btnContainer: {
    flexDirection: 'row',
    marginHorizontal: resize(20),
    justifyContent: 'space-between',
    marginTop: resize(340, 'h')
  },
  listCards: {
    alignItems: 'center',
  },
  addCardBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: resize(26),
    marginTop: resize(23, 'h')
  },
  addCardBtnText: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '300',
    letterSpacing: resize(0.35),
  },
  addCardBtnIcon: {
    width: resize(28),
    height: resize(28),
    marginRight: resize(5)
  },
});