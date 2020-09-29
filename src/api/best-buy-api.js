import axios from 'axios';

export const GetFromBestBuyApi = axios.create({
	baseURL: 'https://haste-test-api.herokuapp.com/',
});
