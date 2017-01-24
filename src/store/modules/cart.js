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
	},
	deleteCartItem ({ commit, state }, itemIndex) {
		commit(types.DELETE_CART_ITEM, itemIndex)
	}

}



// mutations
const mutations = {
	//初始化购物车数据
	[types.INIT_CART_DATA](state, data) {
		
		for(let item of data.orders) {
			item.isChecked = false
		}
		state.cartListData = data.orders;

		// console.log(state.cartListData)
		state.total_price = data.total_price;
	},
	initSelectData (state, checkedItemIndex) {
		var cartListData = state.cartListData;
		var selectedItemList = []
		var selectedCount = 0; 
		var price = 0;

		for(let index of checkedItemIndex) {
			var selectItem = cartListData[index]
			selectItem.isChecked = true;
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
	//选择商品项目
	[types.CHANGE_SELECT_ITEM](state, checkedItemIndex) {
		state.selectedData.checkedItemIndex = checkedItemIndex;
		mutations.initSelectData(state, checkedItemIndex)	
	},
	//删除购物车选项
	[types.DELETE_CART_ITEM](state, itemIndex) {
		state.cartListData.splice(itemIndex, 1)

		var checkedArr = [];
        state.cartListData.forEach((item, index) => {
            if(item.isChecked) {
                checkedArr.push(index)
            }
        });
        state.selectedData.checkedItemIndex = checkedArr;

        mutations.initSelectData(state, checkedArr)
        
	},
}


export default {
  state,
  actions,
  getters,
  mutations
}