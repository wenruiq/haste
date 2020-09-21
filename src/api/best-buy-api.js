import axios from 'axios';

export const GetFromBestBuyApi = axios.create({
	baseURL: 'http://haste-test-api.herokuapp.com/',
});
