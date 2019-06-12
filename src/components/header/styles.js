import { StyleSheet } from 'react-native';

//custom
import { resize } from '../../utils/styles';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  left: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
  },
  center: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: resize(21)
  }
});