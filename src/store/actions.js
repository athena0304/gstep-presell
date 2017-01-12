import * as types from './mutation-types'
import shop from '../api/shop'

export const changeCount = ({ commit, state, rootState }, val) => {

	commit(types.CHANGE_COUNT, val)

	// getPrice({ commit, state, rootState })
	
}

export const getPrice = ({ commit, state, rootState }) => {
	var properties = rootState.products.initData.properties;
	var items = properties.map(function(item, index, array) {
		return item.type[item.current]
	})

	var params = {
		color: items[0],
		size: items[1],
		quality: items[2],
		num: rootState.products.product.count
	}

	shop.getPrice(params, function(data) {
		commit(types.CHANGE_PRICE, data.res.price)
	})
}