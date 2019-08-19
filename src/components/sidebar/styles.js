import { StyleSheet } from 'react-native';

//utils
import { resize, width, height } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'black'
  },
  content: {
    marginHorizontal: resize(20),
    paddingTop: resize(66, 'h'),
    alignItems: 'center'
  },
  containerItems: {
    marginTop: resize(60, 'h'),
    height: resize(180, 'h'),
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: resize(140, 'h')
  },
});