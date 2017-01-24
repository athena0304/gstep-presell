<template>
<div>
	<head-bar>
		<h3 class="title">确认订单</h3>
	</head-bar>
	<div>
		<div class='address'>
			<div class="main make_order">
			  <div class="">
			    <div class="order addresses" style="" @click='addAddress'>
			      <div class="order-inner vertical-middle">
			        <div class="order-detail">
			        	<div class='addressArea'>
			        		<div v-if="CchooseAddr">
			        			<p>
			        				<span class="name">{{CchooseAddr.name}}</span><span class="phone">{{CchooseAddr.phone}}</span>
			        			</p>
			          		<p class="detail">
			        			<span>{{CchooseAddr.province|city}} {{CchooseAddr.municipality|city}} {{CchooseAddr.region|city}} {{CchooseAddr.address}}</span>
			        			</p>
			        		</div>
			        		<div v-else>
			        				去添加地址
			        		</div>
			        	</div>
			        </div>
			        <div class="price vertical-middle">
			          <img src="~static/img/arrow.png" alt="" style="width:0.2rem">
			        </div>
			      </div>
			    </div>
			    <div class="order order_show_wrapper" style="">
			      <div class="order-inner vertical-middle">
			        <div class="order-detail">
			          共<span class="order_total_number">{{selectedData.selectedCount}}</span>件商品
			        </div>
			      </div>
			    </div>
			    <div class="order-show">
			    	<div class="order" v-for="(property, itemIndex) in selectedData.selectedItemList">
			    	    <div class="order-inner vertical-middle">
			    	        <div class="order-img">
			    	            <img :src="'http://preseller.gsteps.cn/' + property.thumbnail" alt="" />
			    	        </div>
			    	        <div class="order-detail">
			    	            <p>
			    	              {{property.commodity_title}}
			    	            </p>
			    	            <p class="detail">
			    	                <span v-for="(item, index) in property.options">{{item.cn_attr_name}}: {{item.cn_option_name}}</span>
			    	            </p>
			    	        </div>
			    	        <div class="price vertical-middle">
			    	            <p>￥{{property.price}}</p>
			    	            <p>×{{property.count}}</p>
			    	        </div>
			    	    </div>
			    	</div>
			    </div>

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
			            应付：￥<span class="order_total_price">{{selectedData.selectedPrice}}</span>
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
		</div>
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
<style src="../less/purchase.less" scoped></style>
<style lang='less' scoped>
	.order-detail-footer {
		position: absolute;
		bottom: 0;
	}
	.main {
		top: 0.96rem;
	}
	.addressArea {
		display: block;
	}
</style>
<script>
import HeadBar from './HeadBar'
import { mapGetters, mapActions } from 'vuex'
import { generate } from '../util/general'

export default {

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
		...mapGetters ({
        chooseAddr: 'chooseAddr',
        defaultAddress: 'defaultAddress',
        selectedData: 'selectedData',
    }),
		CchooseAddr () {
			return this.chooseAddr || this.defaultAddress
		}
	},
	methods: {

		addAddress () {
			this.address = true
			if (this.CchooseAddr) {
				return this.$router.push({
					name: 'addressList'
				})
			}
		},
		makePurchase () {
			this.$store.dispatch('makeOrder', {
				// ids: this.ids,
				ids: [1,2,3],
				router: this.$router })
		}
	},
	beforeRouteLeave (to, from, next) {
		next()
	},
	mounted () {
		this.$store.dispatch('changeMakeStatus', { status: false })
		this.isShow = false
	},
	created () {
		this.$store.dispatch('getAddress')
	}
}
</script>