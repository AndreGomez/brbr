import { dispatchRequest } from './index'
import { Base64 } from 'js-base64';

//dev
// const openPayUrl = 'https://sandbox-api.openpay.mx/v1/'
// const openPayMerchantId = 'mekufygnhp9486zophzf'
// const openPaySk = 'sk_1e353cefde3348c286ce252ca26ff8a5'
// const openPayPk = 'pk_a64ea6b36cc4413eb77f2e6c271b2831'

//prof
const openPayUrl = 'https://api.openpay.mx/v1/'
const openPayMerchantId = 'milifwf6b1ykvgczh4ld'
const openPaySk = 'sk_a2a32c01f2c2496fa3861a9304dec8c9'
const openPayPk = 'pk_5e8d5692297746d58442653d944cc8db'

const urlOpenPay = `${openPayUrl}${openPayMerchantId}/tokens`

const credentials = Base64.encode(openPaySk + ':' + '')

export const getObjectCard = async (id = '', card_id = '') => {
  try {
    const resolve = await fetch(`${openPayUrl}${openPayMerchantId}/customers/${id}/cards/${card_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Basic ${credentials}`,
      },
    })
    return Promise.resolve(resolve);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const addPaymentMethodToken = async (data = {}) => {
  return await dispatchRequest({
    method: 'post',
    url: `users/payment`,
    data: {
      ...data
    }
  })
}

export const deletePaymenCard = async (id) => {
  return await dispatchRequest({
    method: 'DELETE',
    url: `users/payment/${id}`,
  })
}

export const usePaymentMethod = async (id = '') => {
  return await dispatchRequest({
    method: 'GET',
    url: `users/payment/${id}`,

  })
}

export const generateToken = async (data = {}) => {
  try {
    const resolve = await fetch(urlOpenPay, {
      method: 'post',
      body: JSON.stringify({
        ...data
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Basic ${credentials}`,
      },
    })
    return Promise.resolve(resolve);
  } catch (error) {
    return Promise.reject(error);
  }
}