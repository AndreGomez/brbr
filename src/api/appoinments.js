
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