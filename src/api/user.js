//custom
import { dispatchRequest } from '../api';

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