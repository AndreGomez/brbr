import { PermissionsAndroid, Platform } from "react-native";

export const multiplePermissions = async Permissions => {
  try {
    if (Platform.OS === "ios") {
      return true;
    }
    let allPermissions = [];
    Permissions.forEach(permiso => {
      allPermissions.push(PermissionsAndroid.PERMISSIONS[permiso]);
    });
    const granted = await PermissionsAndroid.requestMultiple(allPermissions);
    if (granted[allPermissions[0]] === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const requestPermission = async (Permission, PermissionModalText) => {
  try {
    if (Platform.OS === "ios") {
      return true;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[Permission],
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};