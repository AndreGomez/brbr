import { dispatchRequest } from './index'

const openPayUrl = 'https://sandbox-api.openpay.mx/v1/'
const openPayMerchantId = 'mekufygnhp9486zophzf'
const openPaySk = 'sk_1e353cefde3348c286ce252ca26ff8a5'
const openPayPk = 'pk_a64ea6b36cc4413eb77f2e6c271b2831'

const urlOpenPay = `${openPayUrl}${openPayMerchantId}/tokens`

const credentials = window.btoa(openPayPk + ':' + '')

export const addPaymentMethodToken = async (data = {}) => {
  return await dispatchRequest({
    method: 'post',
    url: `users/payment`,
    data: {
      ...data
    }
  })
}

export const generateToken = async (data = {}) => {
  console.log('URL', urlOpenPay)
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