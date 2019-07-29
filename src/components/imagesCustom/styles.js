import { StyleSheet } from 'react-native';

import { resize } from '../../utils/styles';
export default StyleSheet.create({
  roundedNormal: {
    width: resize(65, 'h'),
    height: resize(65, 'h'),
  },
  roundedS: {
    width: resize(48, 'h'),
    height: resize(48, 'h'),
  },
  list: {
    width: resize(74),
    height: resize(74),
    borderRadius: 10,
  },
  complete: {
    width: '100%',
    height: '100%'
  },
});