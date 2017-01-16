import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
	cartListData: [],
	total_price: null
}

const getters = {
	cartListData: state => state.cartListData,
	total_price: state => state.total_price,
}


// actions
const actions = {
	initCartData ({ commit, state }, data) {
		commit(types.INIT_CART_DATA, data)
	}

}

// mutations
const mutations = {
	[types.INIT_CART_DATA](state, data) {
		state.cartListData = data.orders;
		state.total_price = data.total_price;
	},
}


export default {
  state,
  actions,
  getters,
  mutations
}