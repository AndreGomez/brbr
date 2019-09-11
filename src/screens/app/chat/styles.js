import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM, width } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: resize(30),
    paddingBottom: resize(65, 'h')
  },
  inputContainer: {
    width: width,
    height: resize(63, 'h'),
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0
  },
  btn: {
    height: '100%',
    width: resize(100),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  input: {
    height: '100%',
    width: resize(310),
    paddingHorizontal: resize(30),
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  btnText: {
    color: 'white',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(14),
    fontWeight: '700',
  },
  messageOwner: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 0,
    backgroundColor: '#2d2d2d',
    paddingHorizontal: resize(20),
    paddingVertical: resize(15, 'h'),
    width: resize(300),
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginTop: resize(25, 'h')
  },
  list: {
    paddingBottom: resize(10, 'h')
  },
  messageReciever: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 12,
    backgroundColor: '#94ffb4',
    paddingHorizontal: resize(20),
    paddingVertical: resize(15, 'h'),
    width: resize(300),
    marginTop: resize(25, 'h')
  },
  textOwner: {
    color: '#ffffff',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  textReciever: {
    color: 'black',
    fontFamily: 'Airbnb Cereal App',
    fontSize: resize(16),
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
});