import { Keyboard } from 'react-native';
import axios from 'axios';

//custom
import { store } from '../../store';

//env
import { BASE_URL } from '../../enviroment';

const state = async () => {
  return await store.getState();
}

const instance = axios.create({
  baseURL: BASE_URL
});

export const dispatchRequest = async (request, key = true) => {

  const _state = await state();

  instance.defaults.headers.common['Content-Type'] = 'application/json';
  instance.defaults.headers.common['Accept'] = 'application/json';
  instance.defaults.headers.common['Authorization'] = _state.auth.token;

  try {
    if (key) {
      Keyboard.dismiss();
    }

    const resource = await instance(request);

    return Promise.resolve(resource);
  } catch (error) {
    return Promise.reject(error);
  }
}