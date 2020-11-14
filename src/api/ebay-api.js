import axios from 'axios';

//* Base: Find Items By Keywords
let baseURL =
	'https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService';

const appKey = 'LifuHuan-haste-PRD-25007f986-39451291';
const operationName = 'findItemsByKeywords';
const version = '1.0.0';
const returnDataType = 'JSON';
const entriesPerPage = 25; // Mutable
const GlobalID = 'EBAY-SG';
const siteID = 216; // 216 means eBay Singapore

let url = 'v1?';
url += 'OPERATION-NAME=' + operationName;
url += '&SERVICE-NAME=FindingService';
url += '&SECURITY-APPNAME=' + appKey;
url += '&SERVICE-VERSION=' + version;
url += '&GLOBAL-ID=' + GlobalID;
url += '&siteid=' + siteID;
url += '&paginationInput.entriesPerPage=' + entriesPerPage;
url += '&RESPONSE-DATA-FORMAT=' + returnDataType;
// url += '&callback=_cb_findItemsByKeywords';
url += '&REST-PAYLOAD';

// Attach &keywords='something'
export const GetFromEbayApi = axios.create({
	baseURL,
});

export const endingParameters = url;

//! SAMPLE URL
//* https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=LifuHuan-haste-PRD-25007f986-39451291&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iPhone10&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-SG&siteid=216

//! SAMPLE RESPONSE
//* Notables: result.title, result.viewItemURL, result.sellingStatus.currentPrice.__value__ and result.sellingStatus.currentPrice.@currencyId,
//* Description is result.primaryCategory.categoryName maybe?
//* Check result.sellingStatus.sellingState == active maybe
//* image: result.galleryPlusPictureURL
