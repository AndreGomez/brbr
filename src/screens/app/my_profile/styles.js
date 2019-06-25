import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  content: {
    paddingHorizontal: resize(20),
    paddingTop: resize(40, 'h')
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    color: '#ffffff',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(24),
    fontWeight: '500',
  },
  city: {
    color: '#cfcfcf',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(20),
    fontWeight: '300',

  },
  avatar: {
    width: resize(82, 'h'),
    height: resize(82, 'h'),
    borderRadius: resize(41, 'h'),
    borderWidth: 3,
    borderColor: '#707070',
  },
  stars: {
    color: '#ffffff',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(22),
    fontWeight: '700',
  },
  txtContainer: {
    marginLeft: resize(30)
  },
  switch: {
    marginTop: resize(42, 'h')
  },
  separator: {
    height: resize(1),
    borderColor: '#ffffff',
    borderWidth: resize(4),
    marginVertical: resize(34, 'h'),
    backgroundColor: 'white'
  }
});