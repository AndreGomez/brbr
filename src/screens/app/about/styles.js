import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  content: {
    paddingHorizontal: resize(20)
  },
  itemContainer: {
    height: resize(150, 'h'),
    justifyContent: 'space-between',
    marginTop: resize(58, 'h'),
  }
});