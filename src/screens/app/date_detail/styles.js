import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center'
  },
  startBtn: {
    alignSelf: 'center',
    marginTop: resize(50, 'h')
  },
  cancelBtn: {
    alignSelf: 'center',
    marginTop: resize(30, 'h')
  },
  detail: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: '300',
    width: '100%',
    textAlign: 'center',
    paddingTop: resize(27, 'h')
  },
  dateContainer: {
    width: resize(375),
    height: resize(363, 'h'),
    borderRadius: 12,
    borderColor: '#2d2d2d',
    borderStyle: 'solid',
    borderWidth: 2,
    maxHeight: 363,
    marginTop: resize(17, 'h')
  },
  dateContainerTop: {
    borderBottomWidth: 2,
    borderColor: '#2d2d2d',
    maxHeight: 177,
    height: resize(167, 'h'),
    paddingHorizontal: resize(20),
    paddingTop: resize(15, 'h')
  },
  dateContainerBottom: {
    borderColor: '#2d2d2d',
    height: resize(195, 'h'),
    paddingHorizontal: resize(20),
    paddingTop: resize(15, 'h')
  },
  row: {
    flexDirection: 'row',
  },
  client: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: '300',
    paddingLeft: resize(13)
  },
  name: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingLeft: resize(13),
    maxWidth: resize(150)
  },
  stars: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(22),
    fontWeight: '300',
    paddingLeft: resize(13)
  },
  beet: {
    justifyContent: 'space-between'
  },
  dateAgo: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '300',
    alignSelf: 'flex-end'
  },
  btn: {
    marginTop: resize(30, 'h')
  },
  total: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    alignSelf: 'flex-end',
  },
  services: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  totalContainer: {
    marginTop: resize(21, 'h')
  },
  dateHour: {
    color: '#cfcfcf',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: '300',
  },
  dateHourrr: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingLeft: resize(10)
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: resize(15, 'h'),
    marginBottom: resize(5, 'h')
  },
  timer: {
    width: resize(375),
    height: resize(64, 'h'),
    borderRadius: 12,
    borderColor: '#2d2d2d',
    borderStyle: 'solid',
    borderWidth: 2,
    marginTop: resize(23, 'h'),
    flexDirection: 'row',
    paddingHorizontal: resize(20),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  timeText: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(20),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingLeft: resize(15)
  },
  time: {
    color: '#94ffb4',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '300',
  }
});