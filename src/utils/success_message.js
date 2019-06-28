import { Toast } from 'native-base';

const successMessage = (message = "Success", type = 'success') => {

  return Toast.show({
    type,
    text: message,
  });
  // if (Platform.OS === 'ios') {
  //   return Alert.alert(
  //     title,
  //     message
  //   );
  // } else {
  //   return ToastAndroid.show(message, ToastAndroid.SHORT);
  // }
}

export default successMessage;