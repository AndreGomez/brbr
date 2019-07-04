import { StyleSheet, Platform } from 'react-native';

//utils
import {
  resize,
  AIRBNB_MEDIUM,
  width,
} from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: resize(20),
    paddingTop: resize(40, 'h'),
    paddingBottom: 20
  },
  price: {
    color: '#ffffff',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(24),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    width: '100%',
    textAlign: 'center',
    marginTop: resize(38, 'h'),
    marginBottom: resize(77, 'h')
  },
  header: {
    width: '100%',
    height: resize(144, 'h'),
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: resize(41, 'h')
  },
  headerHeader: {
    width: '100%',
    borderColor: 'rgba(0,0,0,0.3)',
    height: resize(85, 'h'),
    borderBottomWidth: 0.5,
    paddingHorizontal: resize(22),
    paddingVertical: resize(13, 'h'),
    flexDirection: 'row'
  },
  date: {
    color: '#000000',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  calendarIcon: {
    width: resize(20),
    height: resize(20),
    marginTop: resize(3.5, 'h')
  },
  service: {
    color: '#95989a',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  location: {
    color: '#000000',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingLeft: resize(16)
  },
  headerHeaderText: {
    marginLeft: resize(16)
  },
  headerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    height: resize(55, 'h'),
    paddingHorizontal: resize(22),
  }
});