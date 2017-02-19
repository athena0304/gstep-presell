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
import address from './components/address'
import myOrder from './components/myOrder'
import all from './components/myOrder/all'
import toBePaid from './components/myOrder/toBePaid'
import toBeDelivered from './components/myOrder/toBeDelivered'
import toBeReceived from './components/myOrder/toBeReceived'

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
}, {
  path: '/address-add',
  name: 'address',
  component: resolve => require(['./components/address.vue'],resolve),
}, {
  path: '/my-order',
  name: 'myOrder',
  component: resolve => require(['./components/myOrder.vue'],resolve),
  children: [
    {
      // 当 /user/:id/profile 匹配成功，
      // UserProfile 会被渲染在 User 的 <router-view> 中
      path: 'all',
      component: all,
      name: 'all'
   }, {
      path: 'toBePaid',
      name: 'wait_pay',
      component: toBePaid
   }, {
      path: 'toBeDelivered',
      component: toBeDelivered,
      name: 'wait_send'
   }, {
      path: 'toBeReceived',
      component: toBeReceived,
      name: 'wait_receive'
   }
  ]
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
