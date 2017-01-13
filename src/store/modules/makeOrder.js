import shop from '../../api/shop'
import * as types from '../mutation-types'
const state = {
	makeOrderList: [],
	makeSure: false
}
const mutations = {
	[types.GOTO_ORDER] (state, ids, makeOrderList) {
		state.makeOrderList = makeOrderList
	},
	[types.MAKE_ORDER] (state, ids, makeOrderList) {
		state.makeSure = true
		state.makeOrderList = []
	},
	[types.CHANGE_MAKE_STATUS] (state, status) {
		state.makeSure = status
	}
}
const getters = {
	makeSure: state => state.makeSure
}
const actions = {
	makeOrder ({ commit, state, rootState }, params) {
		let { ids, router } = params
		shop.makeOrder({
			params: {
				ids
			},
			cb: data => {
				// var makeOrderList = rootState.productList.product_list.filter(item => ids.includes(item.id))
				commit(types.MAKE_ORDER, ids, makeOrderList)
				router.push('/shopping-bag')
			}
		})
	},
	changeMakeStatus ({ commit, state }, params) {
		let { status } = params
		console.log(params)
		commit(types.CHANGE_MAKE_STATUS, status)
	}
}
export default {
	state,
	mutations,
	actions,
	getters
}