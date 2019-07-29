
import { dispatchRequest } from '../api';

export const getBarbersArround = async (data = {}) => {
  return await dispatchRequest({
    method: 'POST',
    url: `barbers/range`,
    data: {
      ...data
    }
  })
}

export const getBarberProfile = async (id = '') => {
  return await dispatchRequest({
    method: 'GET',
    url: `barbers/${id}`
  })
}