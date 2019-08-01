
import { dispatchRequest } from '../api';

export const createAppoiment = async (data = {}) => {
  return await dispatchRequest({
    method: 'POST',
    url: `appointments`,
    data: {
      ...data
    }
  })
}

export const getAppoiment = async (id = '') => {
  return await dispatchRequest({
    method: 'GET',
    url: `appointments/user/${id}`,
  })
}