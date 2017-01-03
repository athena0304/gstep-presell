import * as types from './mutation-types'
import shop from '../api/shop'

export const changeCount = ({ commit, state }, val) => {

    commit(types.CHANGE_COUNT, val)

    	var params = {
			size: 'XL',
			color: 'red',
			quality: 'EXCELLENT',
			num: val
		}
		shop.getPrice(params, function(data) {
			
			// state.product.price = data.res.price;
			// console.log(data.res)
			commit(types.CHANGE_PRICE, data.res.price)
				// _self.res = data.res

		})

}