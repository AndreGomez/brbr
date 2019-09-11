import { StyleSheet, Platform } from 'react-native';

//utils
import {
  resize,
  AIRBNB_MEDIUM,
  width
} from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
  },
  searchInput: {
    height: '100%',
    width: '100%',
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.4),
    paddingLeft: resize(22),
  },
  input: {
    paddingLeft: resize(10),
    color: '#cfcfcf',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  cancel: {
    color: '#94ffb4',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  search: {
    width: resize(375),
    height: resize(54, 'h'),
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: resize(20)
  },
  searchContainer: {
    paddingHorizontal: resize(20),
    marginTop: resize(31, 'h')
  },
  calendarAndServices: {
    width: resize(375),
    height: resize(54, 'h'),
    borderRadius: 6,
    flexDirection: 'row',
    marginTop: resize(7, 'h'),
    zIndex: -1
  },
  calendar: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderRightWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: resize(25),
    width: '50%',
  },
  services: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: resize(25),
    width: '50%',
  },
  location: {
    width: resize(375),
    height: resize(54, 'h'),
    maxHeight: 54,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: resize(25)
  },
  locationText: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.4),
    paddingLeft: resize(22),
  },
  logo: {
    height: resize(26, 'h'),
    width: resize(66)
  },
  searchIcon: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
  },
  header: {
    paddingHorizontal: resize(20)
  },
  vipList: {
    paddingLeft: resize(20),
    paddingRight: resize(8),
    marginTop: resize(18, 'h')
  },
  vipContainer: {
    flexDirection: 'row',
    paddingHorizontal: resize(20),
    marginTop: resize(37, 'h')

  },
  vipText: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
    paddingLeft: resize(9)
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: width - resize(40),
    alignSelf: 'center',
    marginTop: resize(25, 'h')
  },
  brbrArroundContainer: {
    marginTop: resize(30, 'h'),
    paddingHorizontal: resize(20),
    zIndex: -1
  },
  brbrArroundText: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    letterSpacing: resize(0.45),
    zIndex: -1
  },
  reco: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    paddingLeft: resize(20),
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingTop: resize(20, 'h')
  },
  empty: {
    width: '100%',
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    marginTop: resize(20, 'h')
  }
});