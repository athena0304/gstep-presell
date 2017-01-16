import * as types from '../mutation-types'
import shop from '../../api/shop'
const state = {
	addressList: [],
	defaultAddress: null,
	chooseAddress: null
}
const getters = {
	addressList: state => state.addressList,
	defaultAddress: state => state.defaultAddress,
	chooseAddr: state => state.chooseAddress
}
const actions = {
	getAddress ({ commit, state }, address) {
		shop.getAddress(address => {
			commit(types.GET_ADDRESS, address)
		})
	},
	chooseDefultAction ({ commit, state }, params) {
		shop.chooseDefultAddress({
			params,
			cb: data => {
				data.msg === 'success' && actions.getAddress({ commit, state })
			}
		})
	},
	chooseAddress ({ commit }, params) {
		let { item, router } = params
		commit(types.CHOOSE_ADDRESS, item)
		router.push('/confirm-order')
	},
	deleteAddressAction ({ commit, state }, params) {
		shop.deleteAddress({
			params,
			cb: data => {
				commit(types.DELETE_ADDRESS, params.address_id, data.res.default_address_id)
			}
		})
	},
	addAddressAction ({ dispatch, state }, params) {
		let param = params.param
		let router = params.router
		shop.addAddress({
			params: param,
			cb: data => {
				data.msg === 'success' && router.push('/address-list')
			}
		})
	},
	editAddressAction ({ dispatch, state }, params) {
		let param = params.param
		let router = params.router
		shop.editAddress({
			params: param,
			cb: data => {
				data.msg === 'success' && router.push('/address-list')
			}
		})
	}
}
const mutations = {
	[types.CHANGE_DEFAULT] (state) {
		console.log('ll')
	},
	[types.GET_ADDRESS] (state, address) {
		address.res.default && address.res.other.unshift(address.res.default)
		state.addressList = address.res.other
		state.defaultAddress = address.res.default
	},
	[types.CHOOSE_ADDRESS] (state, chooseAddr) {
		state.chooseAddress = state.addressList.find(item => item.id === chooseAddr.id)
	},
	[types.DELETE_ADDRESS] (state, addressID, defaultAddressID) {
		state.addressList.splice(state.addressList.findIndex(ele => ele.id === addressID), 1)
		state.addressList.forEach(ele => {
			ele.default = (ele.id === defaultAddressID)
			// if (ele.id === defaultAddressID) {
			// 	ele.default = true
			// } else {
			// 	ele.default = false
			// }
		})
	}
}
export default {
	state,
	mutations,
	actions,
	getters
}
