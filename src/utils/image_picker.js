import ImagePicker from 'react-native-image-picker';

const ImageSelect = async (title = 'image') => {
  const options = {
    title,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  return new Promise((resolve) => {
    ImagePicker.showImagePicker(options, (response) => {
      resolve(response)
    })
  })
}

const ImageCamera = async (title = 'image') => {
  const options = {
    title,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  return new Promise((resolve) => {
    ImagePicker.launchCamera(options, (response) => {
      resolve(response)
    });
  })
}

const ImageLibrary = async (title = 'image') => {
  const options = {
    title,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  return new Promise((resolve) => {
    ImagePicker.launchImageLibrary(options, (response) => {
      resolve(response)
    });
  })
}

export default {
  ImageSelect,
  ImageCamera,
  ImageLibrary
}