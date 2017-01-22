import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
	cartListData: [],
	selectedData: {
		selectedPrice: 0,
		selectedItemList:[],
		selectedCount: 0,
		checkedItemIndex: [],
		isSelectAll: false,
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
	changeSelectItem ({ commit, state }, checkedItemIndex) {
		commit(types.CHANGE_SELECT_ITEM, checkedItemIndex)
	}

}

// mutations
const mutations = {
	//初始化购物车数据
	[types.INIT_CART_DATA](state, data) {
		state.cartListData = data.orders;
		state.total_price = data.total_price;
	},
	//选择商品项目
	[types.CHANGE_SELECT_ITEM](state, checkedItemIndex) {
		state.selectedData.checkedItemIndex = checkedItemIndex;

		var cartListData = state.cartListData;
		var selectedItemList = []
		var selectedCount = 0; 
		var price = 0;

		for(let index of checkedItemIndex) {
			var selectItem = cartListData[index]
			//已选中数组
			selectedItemList.push(selectItem)
			//总数
			selectedCount = selectedCount + selectItem.count;
			//总价
			price = price +  selectItem.price;
		}

		state.selectedData.selectedCount = selectedCount;
		state.selectedData.selectedItemList = selectedItemList;
		state.selectedData.selectedPrice = price;
		
	},
}


export default {
  state,
  actions,
  getters,
  mutations
}