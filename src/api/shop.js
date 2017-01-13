var axios = require('axios')

const COMMODITY_ID = 1

function ajax({
	url,
	params = {},
	method = "post",
	cb = function() {},
	cbError = function() {}
}) {
	let sendData = {
		method,
		url,
		cb,
		cbError
	}
	if (method == "get") {
		Object.assign(sendData, {
			params
		});
	} else {
		Object.assign(sendData, {
			data: params
		});
	}

	axios(sendData)
		.then(response => cb(response.data))
		.catch(error => cbError(error));
}

export default {
	ajax,
	getProducts (cb) {
		setTimeout(() => cb(_products), 100)
	},
	getHomeData (cb) {
		ajax({
			url: '/api/commodity/index',
			method: 'post',
			params: {
				commodity_id: COMMODITY_ID
			},
			cb: cb
		})
	},
	getIntroduction (cb) {
		ajax({
			url: '/api/publisher/324234242423',
			params: {
				commodity_id: COMMODITY_ID
			},
			cb: cb
		})
	},
	getPurchaseDetail (cb) {
		ajax({
			url: '/api/commodity/attribute',
			params: {
				commodity_id: COMMODITY_ID
			},
			cb: cb
		})
	},
	getPrice (params, cb) {
		ajax({
			url: '/dongzhe/get_price',
			cb: cb,
			params
		})
	},
	getNumberInfo (cb) {
		ajax({
			url: '/api/number_info',
			cb: cb
		})
	},
	getSimpleProduct (cb) {
		ajax({
			url: '/api/test',
			cb: cb
		})
		// setTimeout(() => cb(_simpleProduct), 500)
	},
	buyProducts (products, cb, errorCb) {
		setTimeout(() => {
			// simulate random checkout failure.
			(Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1) ? cb() : errorCb()
		}, 100)
	},
	makeOrder ({ params, cb }) {
		ajax({
			method: 'get',
			url: '/dongzhe/make_order',
			params,
			cb
		})
	},
	getAddress (cb) {
		ajax({
			url: '/api/address/all',
			cb
		})
	}
}
