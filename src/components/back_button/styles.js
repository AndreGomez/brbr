import { StyleSheet } from 'react-native';

//custom
import { resize } from '../../utils/styles';

export default StyleSheet.create({
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: resize(20)
  },
  icon: {
    width: resize(24),
    height: resize(24),
  }
});