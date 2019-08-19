//custom
import { dispatchRequest } from '../api';

import { store } from '../../store';

const state = async () => {
  return await store.getState();
};

export const EditProfileUser = async (data = {}, id = '') => {
  return await dispatchRequest({
    method: 'put',
    url: `users/${id}`,
    data: {
      ...data
    }
  })
}

export const SaveAddress = async (data = {}) => {
  return await dispatchRequest({
    method: 'post',
    url: `users/address`,
    data: {
      ...data
    }
  })
}

export const EditAddress = async (data = {}, id = '') => {
  return await dispatchRequest({
    method: 'UPDATE',
    url: `users/address`,
    data: {
      ...data
    }
  })
}

export const setToken = async (data = {}, id = null) => {
  if (!id) {
    const _state = await state()
    id = _state.user._id
  }
  return await dispatchRequest({
    method: 'put',
    url: `users/${id}`,
    data: {
      ...data
    }
  })
}

export const GetMyInfo = async (id = '') => {
  return await dispatchRequest({
    method: 'GET',
    url: `users/${id}`,
  })
}