import { StyleSheet } from 'react-native';

//utils
import { resize, TERTIARY_GREY } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    paddingTop: resize(80, 'height'),
    alignItems: 'center',
    paddingHorizontal: resize(20)
  },
  input: {
    marginTop: resize(25, 'height'),
  },
  btn: {
    marginTop: resize(130, 'height'),
  },
  ups: {

  }

});