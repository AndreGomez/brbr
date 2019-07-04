import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, TERTIARY_GREY, AIRBNB_MEDIUM, width } from '../../../utils/styles';

const DARK_COLOR = "black";
const LIGHT_COLOR = "#FFF";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: resize(20)
  },
  input: {
    marginTop: resize(25, 'height'),
  },
  inputPhone: {
    marginTop: resize(25, 'height'),
    width: '100%'
  },
  btn: {
    marginTop: resize(100, 'height'),
  },
  ups: {

  },
  phone: {
    alignItems: 'center',
  },
  country: {
    height: resize(60, 'h'),
    width: resize(60, 'h'),
    position: 'absolute',
    right: 0,
    top: resize(25, 'h'),
    alignItems: 'flex-end'
  }
});
export const modalDark = StyleSheet.create({
  modalContainer: {
    backgroundColor: DARK_COLOR,
  },
  contentContainer: {
    backgroundColor: DARK_COLOR,
  },
  header: {
    backgroundColor: DARK_COLOR
  },
  itemCountryName: {
    borderBottomWidth: 0
  },
  countryName: {
    color: LIGHT_COLOR,
    fontFamily: AIRBNB_MEDIUM
  },
  letterText: {
    color: LIGHT_COLOR,
    fontFamily: AIRBNB_MEDIUM
  },
  input: {
    color: LIGHT_COLOR,
    borderBottomWidth: 1,
    borderColor: LIGHT_COLOR,
    fontFamily: AIRBNB_MEDIUM
  }
});
