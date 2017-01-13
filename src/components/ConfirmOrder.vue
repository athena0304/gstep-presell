<template>
<div>
	<head-bar>
		<h3 class="title">确认订单</h3>
	</head-bar>
	<div>
		<div class='address'>
			<div class="main make_order">
			  <div class="">
			    <div class="order addresses" style="">
			      <div class="order-inner vertical-middle">
			        <div class="order-detail">
			          <p>
			            <span class="name">范晓宇</span><span class="phone">13552266949</span>
			          </p>
			          <p class="detail">
			            中国 北京市 朝阳区 酒仙桥6号院电子国际总
			          </p>
			        </div>
			        <div class="price vertical-middle">
			          <img src="~static/img/arrow.png" alt="" style="width:0.2rem">
			        </div>
			      </div>
			    </div>
			    <div class="order order_show_wrapper" style="">
			      <div class="order-inner vertical-middle">
			        <div class="order-detail">
			          共<span class="order_total_number"></span>件商品
			        </div>
			        <div class="price vertical-middle">
			          <img src="~static/img/arrow.png" alt="" style="width:0.2rem">
			        </div>
			      </div>
			    </div>
			    <div class="order-show"></div>

			    <div class="order yunfei" style="">
			      <div class="order-inner vertical-middle">
			        <div class="order-detail">
			          <span>
			            运费
			          </span>
			        </div>
			        <div class="price vertical-middle">
			          <p>
			            ￥0.00
			          </p>
			        </div>
			      </div>
			    </div>
			    <div class="order shouldpay" style="">
			      <div class="order-inner vertical-middle">
			        <div class="price vertical-middle">
			          <p>
			            应付：￥<span class="order_total_price">495.00</span>
			          </p>
			        </div>
			      </div>
			    </div>
			    <div class="order comment" style="">
			      <div class="order-inner vertical-middle">
			        <div class="commet-context">
			          <p>
			            留言
			          </p>
			        </div>
			        <div class="commet-context">
			          <input type="text" name="" id="">
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
			<!-- <a href="javascript:;" @click='addAddress'>
				<ul v-if="CchooseAddr">
					<li>
						<span>手机: {{CchooseAddr.phone}}; 姓名：{{CchooseAddr.name}}</span>
					</li>
					<li>
					<span>{{CchooseAddr.province|city}};{{CchooseAddr.municipality|city}};{{CchooseAddr.region|city}};{{CchooseAddr.address}}</span>
					</li>
				</ul>
				<div v-else>
						去添加地址
				</div>
			</a> -->
			<!-- <a href="javascript:;" @click='chooseAddress'>选择地址</a> -->
		</div>
<!-- 		<ul>
			<li v-for='(item, index) in makeOrderList'>
				<span>颜色: {{item.properties.color}}</span>
				<span>尺寸: {{item.properties.size}}</span>
				<span>质量: {{item.properties.quality}}</span>
				<span>X {{item.num}}</span>
				<span>价钱: {{item.cost}} 元</span>
			</li>
		</ul>
		<div><span>总价：{{total}}</span></div> -->
		<div class="order-footer">
      <div @click='makePurchase' class="order-footer order-detail-footer">
        微信支付
      </div>
    </div>
		<!-- <div><button >微信支付</button></div> -->
		<!-- <div v-show='isShow'>
			<p>确定要退回到购物车吗？</p>
			<button @click='makesure'>确定</button>
			<button @click='makegiveup'>放弃</button>
		</div> -->
	</div>
</div>
</template>
<style src="../less/purchase.less"></style>
<style lang='less' scoped>
	.order-detail-footer {
		position: absolute;
		bottom: 0;
	}
	.main {
		top: 0.96rem;
	}
</style>
<script>
import HeadBar from './HeadBar'
import { mapGetters, mapActions } from 'vuex'
// import { makeOrderList, makeSure, defaultAddress, chooseAddr } from '../vuex/getters'
import { generate } from '../util/general'
// import { makeOrder, changeMakeStatus, getAddress } from '../vuex/actions'
export default {
	// vuex: {
	// 	getters: {
	// 		makeOrderList,
	// 		makeSure,
	// 		defaultAddress,
	// 		chooseAddr
	// 	},
	// 	actions: {
	// 		makeOrder,
	// 		changeMakeStatus,
	// 		getAddress
	// 	}
	// },
	components: {
		HeadBar
	},
	data () {
		return {
			isShow: false,
			address: false
		}
	},
	computed: {
		// CchooseAddr () {
		// 	return this.chooseAddr || this.defaultAddress
		// },
		// total () {
		// 	return this.makeOrderList.reduce(generate(this.add), 0)
		// },
		// ids () {
		// 	return Array.from({ length: this.makeOrderList.length }, (v, k) => this.makeOrderList[k].id)
		// }
	},
	methods: {

		// addAddress () {
		// 	this.address = true
		// 	if (this.CchooseAddr) {
		// 		return this.$router.push({
		// 			name: 'addressList'
		// 		})
		// 	}
		// 	this.$router.push({
		// 		name: 'address',
		// 		params: {
		// 			type: 'default',
		// 			data: {
		// 				province: '1;北京',
		// 				municipality: '1;东城区',
		// 				region: '0;请选择'
		// 			}
		// 		}
		// 	})
		// },
		makePurchase () {
			this.$store.dispatch('makeOrder', {
				// ids: this.ids,
				ids: [1,2,3],
				router: this.$router })
		}
		// makesure () {
		// 	this.isShow = false
		// 	this.changeMakeStatus(true)
		// 	this.$router.go(-1)
		// },
		// makegiveup () {
		// 	this.isShow = false
		// 	this.changeMakeStatus(false)
		// },
		// add (a, b) {
		// 	return parseInt(a) + parseInt(b.cost)
		// }
	},
	beforeRouteLeave (to, from, next) {
		// if (this.address) {
			next()
		// 	this.address = false
		// 	return
		// }
		// this.isShow = true
		// if (this.makeSure) {
		// 	next()
		// 	return
		// }
		// next(false)
	},
	mounted () {
		// this.changeMakeStatus(false)
		// this.isShow = false
	},
	created () {
		this.$store.dispatch('getAddress')
	}
}
</script>