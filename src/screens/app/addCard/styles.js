import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  content: {
    paddingHorizontal: resize(20)
  },
  titleContainer: {
    marginVertical: resize(47, 'h'),
    flexDirection: 'row',
    alignItems: 'center'
  },
  aboutContainer: {
    width: resize(370),
    alignSelf: 'flex-start',
    marginTop: resize(10, 'h')
  },
  about: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  openLogo: {
    height: resize(50, 'h'),
    alignSelf: 'center',
    marginTop: resize(20, 'h')
  },
  title: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
    paddingLeft: resize(13)
  },
  cardsIcon: {
    width: resize(37),
    height: resize(28),
  },
  input: {
    marginTop: resize(10, 'h')
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputIcon: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    paddingTop: resize(20, 'h')
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: resize(5, 'h'),
    width: '100%'
  },
  select: {
    marginTop: resize(30, 'h')
  }
});