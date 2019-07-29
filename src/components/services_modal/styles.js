import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM, width } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  content: {
    borderRadius: 12,
    backgroundColor: 'white',
    height: resize(450, 'height'),
    width: resize(350),
    maxHeight: 450,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: resize(52, 'height'),
  },
  closeBtn: {
    right: resize(21),
    top: resize(16, 'h'),
    position: 'absolute',
  },
  title: {
    color: '#4a4a4a',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingTop: resize(27, 'h')
  },
  lbl: {
    color: '#000000',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(22),
    fontWeight: '700',
  },
  btnSelect: {
    width: resize(26, 'h'),
    height: resize(26, 'h'),
    borderRadius: resize(26, 'h') / 2,
    backgroundColor: '#000000',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnNoSelect: {
    width: resize(22, 'h'),
    height: resize(22, 'h'),
    borderRadius: resize(22, 'h') / 2,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  btn: {
    marginTop: resize(33, 'h'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: resize(36),
    marginTop: resize(32, 'h'),
    height: resize(26, 'h'),
  }
});