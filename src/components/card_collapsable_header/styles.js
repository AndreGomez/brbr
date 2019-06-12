import { StyleSheet } from 'react-native';

//custom
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  cell: {
    height: resize(65, 'height'),
    justifyContent: 'center',
    borderColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    marginHorizontal: resize(20),
  },
  cellTitle: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '500',
    letterSpacing: resize(0.45),
    paddingLeft: resize(13)
  },
  cells: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  cellRight: {
    justifyContent: 'flex-end',
  },
  check: {
    height: resize(8, 'height'),
    width: resize(12)
  },
  checkContainerChecked: {
    backgroundColor: 'white',
    height: resize(26),
    width: resize(26),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: resize(13)
  },
  cardIcon: {
    width: resize(37),
    height: resize(28, 'h'),
  },
  paypalIcon: {
    marginLeft: resize(13),
    width: resize(78),
    height: resize(21, 'h'),
  },
  checkContainerUnchecked: {
    borderRadius: resize(13),
    borderWidth: 1,
    height: resize(26),
    width: resize(26),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white'
  },

})