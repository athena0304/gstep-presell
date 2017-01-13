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
			if (ele.id === defaultAddressID) {
				ele.default = true
			} else {
				ele.default = false
			}
		})
	}
}
export default {
	state,
	mutations,
	actions,
	getters
}
