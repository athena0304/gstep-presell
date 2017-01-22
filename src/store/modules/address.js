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
			params: params.param,
			cb: data => {
				if (data.msg === 'success') {
					params.callback && params.callback(function() {
						actions.getAddress({ commit, state })
					})
				}
			}
		})
	},
	chooseAddress ({ commit }, params) {
		let { item, router } = params
		commit(types.CHOOSE_ADDRESS, item)
		router.push('/confirm-order')
	},
	deleteAddressAction ({ commit, state }, params) {
		let { param, callback } = params
		shop.deleteAddress({
			params: param,
			cb: data => {
					let default_address_id = data.res.default_address_id
					callback && callback(function() {
						commit(types.DELETE_ADDRESS, {
							address_id: param.address_id,
							default_address_id
						})
				})
			}
		})
	},
	addAddressAction ({ dispatch, state }, params) {
		let { param, router, callback } = params
		shop.addAddress({
			params: param,
			cb: data => {
					if (data.msg === 'success') {
						callback && callback(() => router.push('/address-list'))
					}
				}
			})
	},
	editAddressAction ({ dispatch, state }, params) {
		let { param, router, callback } = params
		shop.editAddress({
			params: param,
			cb: data => {
				if (data.msg === 'success') {
					callback && callback(() => router.push('/address-list'))
				}
			}
		})
	}
}
const mutations = {
	[types.CHANGE_DEFAULT] (state) {
		// console.log('ll')
	},
	[types.GET_ADDRESS] (state, address) {
		address.res.default && address.res.other.unshift(address.res.default)
		state.addressList = address.res.other
		state.defaultAddress = address.res.default
	},
	[types.CHOOSE_ADDRESS] (state, chooseAddr) {
		state.chooseAddress = state.addressList.find(item => item.id === chooseAddr.id)
	},
	[types.DELETE_ADDRESS] (state, params) {
		let addressID = params.address_id
		let defaultAddressID = params.default_address_id
		state.addressList.splice(state.addressList.findIndex(ele => ele.id === addressID), 1)
		state.addressList.forEach(ele => {
			ele.default = (ele.id === defaultAddressID)
		})
	}
}
export default {
	state,
	mutations,
	actions,
	getters
}
