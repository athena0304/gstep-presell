import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
	cartListData: [],
	selectedData: {
		selectedPrice: 0,
		selectedItemList:[],
		selectedCount: 0,
		checkedItemIds: []
	},
	total_price: null
}

const getters = {
	cartListData: state => state.cartListData,
	selectedData: state => state.selectedData,
	total_price: state => state.total_price,
}


// actions
const actions = {
	initCartData ({ commit, state }, data) {
		commit(types.INIT_CART_DATA, data)
	},
	changeSelectItem ({ commit, state }, checkedItemIds) {
		commit(types.CHANGE_SELECT_ITEM, checkedItemIds)
	}

}

// mutations
const mutations = {
	[types.INIT_CART_DATA](state, data) {
		state.cartListData = data.orders;
		state.total_price = data.total_price;
	},
	[types.CHANGE_SELECT_ITEM](state, checkedItemIds) {
		state.selectedData.checkedItemIds = checkedItemIds;
		console.log(state.selectedData.checkedItemIds)
	},
}


export default {
  state,
  actions,
  getters,
  mutations
}