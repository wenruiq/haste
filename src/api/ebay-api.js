import axios from 'axios';

//* Base: Find Items By Keywords
let url = 'https://svcs.ebay.com/services/search/FindingService/v1?';

const appKey = 'LifuHuan-haste-PRD-25007f986-39451291';
const operationName = 'findItemsByKeywords';
const version = '1.0.0';
const returnDataType = 'JSON';
const entriesPerPage = 10; // Mutable
const GlobalID = 'EBAY-SG';
const siteID = 216; // 216 means eBay Singapore

url += 'SECURITY-APPNAME=' + appKey;
url += '&OPERATION-NAME=' + operationName;
url += '&SERVICE-VERSION=' + version;
url += '&RESPONSE-DATA-FORMAT=' + returnDataType;
url += '&REST-PAYLOAD';
url += '&GLOBAL-ID=' + GlobalID;
url += '&siteid=' + siteID;

url += '&paginationInput.entriesPerPage=' + entriesPerPage;

// Attach &keywords='something'
export const GetFromEbayApi = axios.create({
	baseURL: url,
});

//! SAMPLE URL
//* https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=LifuHuan-haste-PRD-25007f986-39451291&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iPhone10&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-SG&siteid=216

//! SAMPLE RESPONSE
//* Notables: result.title, result.viewItemURL, result.sellingStatus.currentPrice.__value__ and result.sellingStatus.currentPrice.@currencyId,
//* Description is result.primaryCategory.categoryName maybe?
//* Check result.sellingStatus.sellingState == active maybe
//* image: result.galleryPlusPictureURL

//TODO: Change api call to a function that takes in some inputs, maybe number of results, sorting, and keyword

//*
const sampleResult = {
	itemId: ['114402416205'],
	title: ['Well Kept Red iPhone Xr, 128GB, Full Box Set'],
	globalId: ['EBAY-SG'],
	primaryCategory: [
		{
			categoryId: ['9355'],
			categoryName: ['Cell Phones & Smartphones'],
		},
	],
	galleryURL: ['https://thumbs2.ebaystatic.com/m/m9JrojuCjaAJ3g-qU9ejk1A/140.jpg'],
	viewItemURL: [
		'https://www.ebay.com.sg/itm/Well-Kept-Red-iPhone-Xr-128GB-Full-Box-Set-/114402416205',
	],
	paymentMethod: ['COD'],
	autoPay: ['false'],
	location: ['Singapore'],
	country: ['SG'],
	shippingInfo: [
		{
			shippingServiceCost: [
				{
					'@currencyId': 'SGD',
					__value__: '0.0',
				},
			],
			shippingType: ['FreePickup'],
			shipToLocations: ['Worldwide'],
		},
	],
	sellingStatus: [
		{
			currentPrice: [
				{
					'@currencyId': 'SGD',
					__value__: '625.0',
				},
			],
			convertedCurrentPrice: [
				{
					'@currencyId': 'SGD',
					__value__: '625.0',
				},
			],
			sellingState: ['Active'],
			timeLeft: ['P19DT20H16M46S'],
		},
	],
	listingInfo: [
		{
			bestOfferEnabled: ['false'],
			buyItNowAvailable: ['false'],
			startTime: ['2020-09-11T01:50:15.000Z'],
			endTime: ['2020-11-11T01:50:15.000Z'],
			listingType: ['StoreInventory'],
			gift: ['false'],
		},
	],
	galleryPlusPictureURL: ['https://galleryplus.ebayimg.com/ws/web/114402416205_1_0_1.jpg'],
	condition: [
		{
			conditionId: ['3000'],
			conditionDisplayName: ['Used'],
		},
	],
	isMultiVariationListing: ['false'],
	topRatedListing: ['false'],
};
