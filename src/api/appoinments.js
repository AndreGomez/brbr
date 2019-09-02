
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

export const updateAppoinment = async (id = '', data = {}) => {
  return await dispatchRequest({
    method: 'PUT',
    url: `appointments/${id}`,
    data: {
      ...data
    }
  })
}

export const getAppoiment = async (id = '', data = {}) => {
  return await dispatchRequest({
    method: 'POST',
    url: `appointments/user/${id}`,
    data: {
      ...data
    }
  })
}

export const getAppoimentPendingReview = async () => {
  return await dispatchRequest({
    method: 'GET',
    url: `appointments/review/pending`,
  })
}

export const getAppoimentById = async (id = '') => {
  return await dispatchRequest({
    method: 'GET',
    url: `appointments/${id}`,
  })
}