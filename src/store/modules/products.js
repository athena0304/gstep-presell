import shop from '../../api/shop'
import * as types from '../mutation-types'

import {getPrice} from '../actions'

// initial state
const state = {
	product: {
		count: 1,
		price: 0, 
	},
	initData: [],
	selected_option_ids: []
}

const getters = {
	price: state => state.product.price,
	initData: state => state.initData,
	selected_option_ids: state => state.selected_option_ids,
	count: state => state.product.count,
}


// actions
const actions = {
	initData ({ commit, state }, data) {
		commit(types.INIT_DATA, data)
	},
	changeItem ({ commit, state , rootState}, data) {
		commit(types.CHANGE_ITEM, data)
		getPrice({ commit, rootState })
	}

}

// mutations
const mutations = {
	[types.CHANGE_COUNT](state, val) {
		state.product.count = val;
	},
	[types.CHANGE_PRICE](state, price) {
		state.product.price = price;
	},
	[types.INIT_DATA](state, data) {
		state.initData = data;
		state.product.price = data.price;
		var attributes = state.initData.attributes;
		state.selected_option_ids = initSelectOption(attributes);
		
	},
	[types.CHANGE_ITEM](state, data) {
		var options = state.initData.attributes[data.itemIndex].options;
		options.forEach(function(item,index,array) {
			item.default = false;
		})
		options[data.index].default = true;

		var attributes = state.initData.attributes;
		state.selected_option_ids = initSelectOption(attributes);
	}
}

let initSelectOption = (attributes) => {
	var selected_option = [];
	attributes.forEach(function(item, index, array) {
		var slectItem = item.options.filter(function(item, index, array) {
			return (item.default)
		})
		var selectIndex = slectItem[0].option_id;
		selected_option.push(selectIndex)
	})
	return selected_option
}

export default {
  state,
  actions,
  getters,
  mutations
}