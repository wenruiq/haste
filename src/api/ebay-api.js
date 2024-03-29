import axios from 'axios';

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

//* Base: Find Items By Keywords 
//* New meta cors anywhere (nov 2022)
let baseURL =
	'https://safe-everglades-24275.herokuapp.com/https://svcs.ebay.com/services/search/FindingService';
	// 'https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService';

const appKey = 'LifuHuan-haste-PRD-25007f986-39451291';
const operationName = 'findItemsByKeywords';
const version = '1.13.0';
const returnDataType = 'JSON';
const GlobalID = 'EBAY-SG';
const siteID = 216; // 216 means eBay Singapore

let url = 'v1?';
url += 'OPERATION-NAME=' + operationName;
url += '&SERVICE-NAME=FindingService';
url += '&SECURITY-APPNAME=' + appKey;
url += '&SERVICE-VERSION=' + version;
url += '&GLOBAL-ID=' + GlobalID;
url += '&siteid=' + siteID;
url += '&RESPONSE-DATA-FORMAT=' + returnDataType;
// url += '&callback=_cb_findItemsByKeywords';
url += '&REST-PAYLOAD';

// Attach &keywords='something'
export const GetFromEbayApi = axios.create({
	baseURL,
	headers: {'X-Requested-With': 'XMLHttpRequest','Access-Control-Allow-Origin': '*'},
	withCredentials: false,
});

export const endingParameters = url;

//! SAMPLE URL
//* https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=LifuHuan-haste-PRD-25007f986-39451291&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iPhone10&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-SG&siteid=216

//! SAMPLE RESPONSE
//* Notables: result.title, result.viewItemURL, result.sellingStatus.currentPrice.__value__ and result.sellingStatus.currentPrice.@currencyId,
//* Description is result.primaryCategory.categoryName maybe?
//* Check result.sellingStatus.sellingState == active maybe
//* image: result.galleryPlusPictureURL
