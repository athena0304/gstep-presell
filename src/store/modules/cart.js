import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
	cartListData: [],
	selectedData: {
		selectedPrice: 0,
		selectedItemList:[],
		selectedCount: 0,
		checkedItemIds: [],
		isSelectAll: false
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
		// console.log(state.cartListData)
		state.selectedData.checkedItemIds = checkedItemIds;

		var cartListData = state.cartListData;
		var selectedItemList = [];

		var selectedCount = 0; 

		checkedItemIds.forEach(function(item, index, array) {
			cartListData.forEach(function(item2, index, array) {
				if(item2.order_id == item) {
					selectedItemList.push(item2)
					selectedCount = selectedCount+ item2.count;
				}
			})
			
		})

		state.selectedData.selectedItemList = selectedItemList;
		
		
		state.selectedData.selectedCount = selectedCount;
		var price = 0;
		state.selectedData.selectedItemList.forEach(function(item, index, array) {
			price = price +  item.price;
		})
		state.selectedData.selectedPrice = price;
		
	},
}


export default {
  state,
  actions,
  getters,
  mutations
}