import shop from '../../api/shop'
import * as types from '../mutation-types'

import {getPrice} from '../actions'

// initial state
const state = {
	product: {
		count: 1,
		price: 0, 
	},
	initData: []
}

const getters = {
	price: state => state.product.price,
	initData: state => state.initData
}


// actions
const actions = {
	initData ({ commit, state }, data) {
		commit(types.INIT_DATA, data)
	},
	changeItem ({ commit, state , rootState}, data) {
		commit(types.CHANGE_ITEM, data)
		// getPrice({ commit, rootState })
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
	},
	[types.CHANGE_ITEM](state, data) {
		var options = state.initData.attributes[data.itemIndex].options;
		options.forEach(function(item,index,array) {
			item.default = false;
		})
		options[data.index].default = true;
	}
}

export default {
  state,
  actions,
  getters,
  mutations
}