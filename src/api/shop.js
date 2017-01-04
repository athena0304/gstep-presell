var axios = require('axios')

function ajax({
	url,
	params = {},
	method = "get",
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
				commodity_id: 1
			},
			cb: cb
		})
	},
	getIntroduction (cb) {
		ajax({
			url: '/api/publisher/324234242423',
			cb: cb
		})
	},
	getPurchaseDetail (cb) {
		ajax({
			url: '/dongzhe/purchase/detail',
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
	}
}
