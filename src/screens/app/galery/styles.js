import { StyleSheet } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  spinner: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: resize(200, 'h')
  },
  content: {
    alignItems: 'flex-end',
    height: '100%',
    width: '100%',
    flexDirection: 'row'
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    marginTop: resize(490, 'h')
  },
  graView: {
    height: resize(300),
  },
  list: {
    marginTop: resize(69, 'h'),
    paddingHorizontal: resize(25)
  },
  imgContainer: {
    marginRight: resize(25)
  },
  select: {
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 12,
    width: resize(78),
    height: resize(78),
  }
});