<template>
	<div class="main">
		<head-bar>
		  <h3 class="title">我的订单</h3>
		</head-bar>
		<div class="tablist">
		  <ul class="tabs">
		    <li class="tab all">
		      <div class="tab_text" @click="show('all')">全部</div>
		      <div class="tab_bottom" :class='{choose: current==="all"}'></div>
		    </li>
		    <li class="tab wait_pay">
		      <div class="tab_text" @click="show('wait_pay')">待付款</div>
		      <div class="tab_bottom" :class='{choose: current === "wait_pay"}'></div>
		    </li>
		    <li class="tab wait_send">
		      <div class="tab_text" @click="show('wait_send')">待发货</div>
		      <div class="tab_bottom" :class='{choose: current === "wait_send"}'></div>
		    </li>
		    <li class="tab wait_receive">
		      <div class="tab_text" @click="show('wait_receive')">待收货</div>
		      <div class="tab_bottom" :class='{choose: current === "wait_receive"}'></div>
		    </li>
		  </ul>
		</div>
		<div class="tab-contents">
			<router-view v-on:getCurrent='getCurrent'></router-view>
		</div>
			
	</div>
</template>
<style src="../less/myOrder.less" scoped></style>
<style scoped>
	.main {
	  bottom:0;
	}
</style>
<script>
	import HeadBar from './HeadBar'
	export default {
		data () {
			return {
				current: 'all'
			}
		},
		components: {
			HeadBar
		},
		methods: {
			show (type) {
				this.current = type
				this.$router.push({
					name: type
				})
			},
			getCurrent (item) {
				this.current = item
				this.$router.replace({
					name: item
				})
			}
		}
	}
</script>