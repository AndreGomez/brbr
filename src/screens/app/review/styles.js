import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    alignItems: 'center'
  },
  cancelTxt: {
    color: '#94ffb4',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(14),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingRight: resize(20),
  },
  writeReview: {
    color: '#ffffff',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(24),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  photoAndStarsContainer: {
    marginTop: resize(77, 'h'),
    width: resize(377),
    height: resize(185, 'h'),
    borderRadius: 12,
    backgroundColor: '#2d2d2d',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: resize(198),
    justifyContent: 'space-between',
    marginTop: resize(83, 'h')
  },
  star: {
    width: resize(35),
    height: resize(33),
  },
  touch_to_star: {
    color: '#cfcfcf',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(14),
    fontWeight: '300',
    alignSelf: 'center',
    marginTop: resize(18, 'h')
  },
  inputsContainer: {
    backgroundColor: 'white',
    width: resize(377),
    height: resize(220, 'h'),
    borderRadius: 12,
    marginTop: resize(24, 'h'),
    paddingHorizontal: resize(22),
  },
  btn: {
    marginTop: resize(46, 'h')
  },
  inputTitle: {
    color: 'black',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(14),
    fontWeight: '300',
    paddingTop: resize(28),
    paddingBottom: resize(14),
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 0.5,
  },
  inputBody: {
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(16),
    fontWeight: '300',
    paddingTop: resize(28),
    paddingBottom: resize(14),
    height: resize(150, 'h'),
  },
  avatar: {
    width: resize(100, 'h'),
    height: resize(100, 'h'),
    borderRadius: resize(100, 'h') / 2,
    alignSelf: 'center',
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 6,
    position: 'absolute',
    top: resize(-50, 'h')
  }
});