// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// import 'normalize.css'
import 'weui/dist/style/weui.min.css'
import 'vux/dist/vux.css'
import 'font-awesome/css/font-awesome.css'

import App from './App'
import Home from './components/Home'
import ShoppingBag from './components/ShoppingBag'
import PresellRule from './components/PresellRule'
import Introduction from './components/Introduction'

Vue.use(VueRouter)

const routes = [{
  path : '/',
  component : Home
}, {
  path : '/shopping-bag',
  component : ShoppingBag
}, {
  path : '/presell-rule',
  component : PresellRule
}, {
  path : '/introduction',
  component : Introduction
}];

const router = new VueRouter({
	mode: 'history',
  	routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
