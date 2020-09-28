import axios from 'axios';

//* Base: Find Items By Keywords
const url = 'http://svcs.ebay.com/services/search/FindingService/v1?';

const appKey = 'LifuHuan-haste-PRD-25007f986-39451291';
const operationName = 'findItemsByKeywords';
const version = '1.0.0';
const returnDataType = 'JSON';
const entriesPerPage = 10;
const GlobalID = 'EBAY-SG';
const siteID = 216;

url += 'SECURITY-APPNAME=' + appKey;
url += '&OPERATION-NAME=' + operationName;
url += '&SERVICE-VERSION=' + version;
url += '&RESPONSE-DATA-FORMAT=' + returnDataType;
url += '&REST-PAYLOAD';
url += '&GLOBAL-ID=' + globalID;
url += '&siteid=' + siteID;


url += '&paginationInput.entriesPerPage=' + entriesPerPage;

export const GetFromEbayApi = axios.create({
	baseURL: url,
});
