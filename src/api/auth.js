//custom
import { dispatchRequest } from '../api';

export const authenticateUser = async (data = {}) => {
  return await dispatchRequest({
    method: 'post',
    url: 'login',
    data
  });
}

export const createAccount = async (data = {}) => {
  return await dispatchRequest({
    method: 'post',
    url: 'users/signup',
    data: {
      ...data
    }
  })
}

export const validateEmail = async (data = {}) => {
  return await dispatchRequest({
    method: 'post',
    url: `users/email`,
    data: {
      ...data
    }
  })
}

export const loginUser = async (data = {}) => {
  return await dispatchRequest({
    method: 'post',
    url: `users/auth`,
    data: {
      ...data
    }
  })
}

