import * as types from './mutation-types'
import shop from '../api/shop'

export const changeCount = ({ commit, state, rootState }, val) => {

	commit(types.CHANGE_COUNT, val)

	getPrice({ commit, state, rootState })
	
}

export const getPrice = ({ commit, state, rootState }) => {
	var attributes = rootState.products.initData.attributes;
	var selected_option = [];
	var items = attributes.forEach(function(item, index, array) {
		var slectItem = item.options.filter(function(item, index, array) {
			return (item.default)
		})
		var selectIndex = slectItem[0].option_id;
		selected_option.push(selectIndex)
	})

	var params = {
		commodity_id: shop.COMMODITY_ID,
		selected_option_ids: selected_option,
		count: rootState.products.product.count
	}

	shop.getPrice(params, function(data) {
		commit(types.CHANGE_PRICE, data.res.price)
	})
}