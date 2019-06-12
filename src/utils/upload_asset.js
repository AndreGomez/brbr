import firebase from 'react-native-firebase';
import moment from 'moment';

const defaultMetadata = {
  contentType: 'image/jpeg',
}

const defaultName = moment().format('HHmmss');

const instance = firebase.storage();

const uploadAsset = async (reference, uri, name = defaultName, metadata = defaultMetadata) => {
  return new Promise((resolve, reject) => {
    instance
      .ref(reference)
      .child(name)
      .putFile(uri, metadata)
      .then(uploadedFile => {
        resolve(uploadedFile.downloadURL);
      }).catch(error => {
        reject(error);
      });
  });
}

export default uploadAsset;