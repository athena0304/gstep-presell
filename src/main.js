// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/Home'
import ShoppingBag from './components/ShoppingBag'

Vue.use(VueRouter)

const routes = [{
  path : '/',
  component : Home
},{
  path : '/shopping-bag',
  component : ShoppingBag
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
