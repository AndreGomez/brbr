import { Alert, ToastAndroid, Platform } from 'react-native';

const parseError = (error) => {
  let _error = error;

  if (Object.entries(error).length > 0) {
    if (error.hasOwnProperty('response')) {
      if (error.response.hasOwnProperty('data')) {
        if (error.response.data.hasOwnProperty('error')) {
          _error = error.response.data.error;
        }
      }
    }
  }

  if (Platform.OS === 'ios') {
    return Alert.alert(
      'Sorry',
      _error
    );
  } else {
    return ToastAndroid.show(_error, ToastAndroid.SHORT);
  }
}

export default parseError;