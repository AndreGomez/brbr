import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
import { setToken, notificationsRead } from '../api/user';

export const updtaeTokenFirebase = async (logout = false) => {
  let _token = 'null';
  try {
    const fcmToken = await firebase.messaging().getToken();
    _token = fcmToken;
  } catch (error) {
    _token = '000';
  }
  if (logout) {
    _token = '000';
  }

  try {
    const res = await setToken({ device_token: _token });
  } catch (error) {
    return new Promise.resolve();
  }
};

export const getMessaging = async (
  props = { authorize: false, logout: false }
) => {
  if (props.authorize) {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      await updtaeTokenFirebase(props.logout);
    } else {
      if (Platform.OS !== 'ios') {
        await firebase.messaging().requestPermission();
        return getMessaging();
      }
    }
  }
  return new Promise.resolve();
};
