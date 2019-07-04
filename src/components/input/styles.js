import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, width, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  sm: {
    width: resize(165),
  },
  placeholder: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
    height: '100%',
  },
  label: {
    color: '#f9f9f9',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
  },
  placeholderFocus: {
    color: '#707070',
    fontFamily: AIRBNB_MEDIUM,
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
  },
  roundedPlaceholderFocus: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 6,
    borderBottomWidth: 0,
    borderColor: '#ffffff',
    borderStyle: 'solid',
  },
  underlineFocus: {
    borderBottomWidth: 4,
    borderColor: '#ffffff',
    borderStyle: 'solid',
  },
  backgroundFocus: {
    backgroundColor: 'red'
  },
  rounded: {
    borderBottomWidth: 0,
    backgroundColor: '#5c5c5c',
    borderRadius: 6,
  },
  roundedText: {
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
    paddingLeft: resize(24),
  },
  roundedTextFocus: {
    color: 'black',
    paddingLeft: resize(24),
    height: '100%',
  },
  underline: {
  },
  underText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '300',
    letterSpacing: resize(0.35),
  },
  item: {
    marginTop: resize(10, 'h'),
    height: resize(60, 'height'),
  },
  itemHeight: {
    height: resize(54, 'height'),
  },
});