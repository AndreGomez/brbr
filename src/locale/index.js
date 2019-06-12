import { AsyncStorage } from 'react-native';

import en from './en';
import es from './es';

export default locale = async () => {
  try {
    const lng = await AsyncStorage.getItem('lng')

    if (lng === 'es') {
      return es
    } else {
      return en
    }
  } catch (error) {

  }
}