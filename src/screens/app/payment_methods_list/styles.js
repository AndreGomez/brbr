import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  content: {
    // backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: resize(20),
    paddingTop: resize(20, 'h')
  },

  brand: {
    height: resize(50, 'h'),
    width: resize(50),
    alignSelf: 'flex-end',
  },
  plusIcon: {
    height: resize(27, 'h')
  },
  item: {
    height: resize(50, 'h')
  },
  cardPlus: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});