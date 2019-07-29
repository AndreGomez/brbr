import { Platform, Alert } from 'react-native';
import { Toast } from "native-base";

export default alertMessage = (message = '') =>
  Platform.OS === 'ios' ?
    Alert.alert('Brbr App', message) :
    Toast.show({
      text: message,
      buttonText: 'Okay',
      type: 'danger'
    })