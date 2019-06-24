import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  content: {
    paddingHorizontal: resize(20),
    alignItems: 'center',
    paddingTop: resize(42, 'h')
  },
  avatar: {
    borderColor: '#707070',
    borderStyle: 'solid',
    borderWidth: 4,
    width: resize(100, 'h'),
    height: resize(100, 'h'),
    borderRadius: resize(50, 'h'),
  },
  title: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
    paddingTop: resize(21, 'h')
  },
  inputContainer: {
    width: '100%',
  },
  pencil: {
    position: 'absolute',
    right: 0,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  save: {
    color: '#94ffb4',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: '500',
    paddingRight: resize(20)
  }
});