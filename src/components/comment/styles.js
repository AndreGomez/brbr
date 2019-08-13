import { StyleSheet, Platform } from 'react-native';
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingVertical: resize(25, 'h'),
    paddingHorizontal: resize(20, 'h'),
    marginTop: resize(15, 'h')
  },
  name: {
    color: '#000000',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(15),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: resize(18, 'h')
  },
  city: {
    color: '#5c5c5c',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  title: {
    color: '#000000',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(17),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  body: {
    color: '#000000',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(16),
    fontWeight: '300',
  },
  date: {
    color: '#95989a',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(14),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  avatar: {
    width: resize(40, 'h'),
    height: resize(40, 'h'),
    borderRadius: resize(20, 'h'),
    marginRight: resize(15)
  }
});