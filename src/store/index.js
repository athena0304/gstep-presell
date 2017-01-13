import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import products from './modules/products'
import makeOrder from './modules/makeOrder'
import address from './modules/address'
import createLogger from 'vuex/dist/logger'


Vue.use(Vuex)


const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    products,
    makeOrder,
    address
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})