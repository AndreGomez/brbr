import { StyleSheet } from 'react-native';

//custom
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  item: {
    height: resize(50, 'h'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    paddingHorizontal: resize(30),
    paddingTop: resize(10, 'h')
  },
  header: {
    flexDirection: 'row',
    height: resize(30, 'h'),
    alignItems: 'center'
  },
  callingCode: {
    color: 'white',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: resize(300),
    marginLeft: resize(20),
    height: '100%',
    paddingHorizontal: resize(10),
    borderRadius: 4,
    color: 'white'
  },
  emoji: {
    fontSize: resize(25),
    paddingRight: resize(15)
  },
  title: {
    color: 'white',
    fontFamily: AIRBNB_MEDIUM,
    fontSize: resize(18),
    width: resize(220),
  },
  container: {
    backgroundColor: 'black'
  }
});