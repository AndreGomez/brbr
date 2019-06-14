import { AsyncStorage } from 'react-native';

import en from './en';
import es from './es';

export default locale = async () => {
  return new Promise(async (resolve, reject) => {

    const lng = await AsyncStorage.getItem('lng')

    if (lng === 'es') {
      resolve(es)
    } else {
      resolve(en)
    }
  })
}