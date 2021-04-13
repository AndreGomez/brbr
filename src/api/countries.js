//custom
import { dispatchRequest } from '../api';

export const getCountries = async () => {
	return await dispatchRequest({
		method: 'GET',
		url: `helpers/countries`,
	})
}
