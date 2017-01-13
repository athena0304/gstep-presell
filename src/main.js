// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// import 'normalize.css'
import 'weui/dist/style/weui.min.css'
// import 'vux/dist/vux.css'
import 'font-awesome/css/font-awesome.css'

import App from './App'
import store from './store'
import Home from './components/Home'
import ShoppingBag from './components/ShoppingBag'
import PresellRule from './components/PresellRule'
import Introduction from './components/Introduction'
import addressList from './components/addressList'

Vue.use(VueRouter)
import { city } from './filter/city'
Vue.filter('city', city)
const routes = [{
  path : '/',
  component : Home
}, {
  path : '/shopping-bag',
  name: 'ShoppingBag',
  component : resolve => require(['./components/ShoppingBag.vue'],resolve),
  // component : ShoppingBag
}, {
  path : '/presell-rule',
  // 懒加载
  component : resolve => require(['./components/PresellRule.vue'],resolve),
  // component : PresellRule
}, {
  path : '/introduction',
  component : resolve => require(['./components/Introduction.vue'],resolve),
  // component : Introduction
},{
  path : '/confirm-order',
  name: 'ConfirmOrder',
  component : resolve => require(['./components/ConfirmOrder.vue'],resolve),
},{
  path: '/address-list',
  name: 'addressList',
  component: resolve => require(['./components/addressList.vue'],resolve),
}];

const router = new VueRouter({
	mode: 'history',
  	routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
