import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
	product: {
		count: 0,
		price: 0, 
	}
}

const getters = {
	price: state => state.product.price
}


// actions
const actions = {

}

// mutations
const mutations = {
	[types.CHANGE_COUNT](state, val) {
		state.product.count = val;
	},
	[types.CHANGE_PRICE](state, price) {
		state.product.price = price;
	}
}

export default {
  state,
  getters,
  mutations
}