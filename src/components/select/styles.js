import { StyleSheet, Platform } from 'react-native';

//custom
import { resize, AIRBNB_MEDIUM } from '../../utils/styles';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: resize(54, 'h'),
    alignSelf: 'center',
  },

  inputContainer: {
    color: '#ffffff',
    fontSize: resize(20),
    fontWeight: '500',
    letterSpacing: resize(0.5),
    width: '100%',
    height: '100%',
    fontFamily: AIRBNB_MEDIUM,
    paddingLeft: resize(24),
    borderRadius: 6,
    borderColor: '#707070',
    borderWidth: 2,
    backgroundColor: '#4a4a4a',
  },
  iconContainer: {
    ...Platform.select({
      ios: {
        height: '100%',
        justifyContent: 'center',
        right: resize(16),
      },
      android: {
        height: '100%',
        justifyContent: 'center',
        right: 15,
      }
    })
  },
  icon: {
    position: 'absolute',
    right: resize(21),
    height: '100%',
  },
});