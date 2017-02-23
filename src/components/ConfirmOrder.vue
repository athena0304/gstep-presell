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
			        				<span @click="addAddress">去添加地址</span>
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
			          共<span class="order_total_number">{{count}}</span>件商品
			        </div>
			      </div>
			    </div>
			    <div class="order-show">
			    	<div class="order" v-for="(property, itemIndex) in confirmOrderData">
			    	    <div class="order-inner vertical-middle">
			    	        <div class="order-img">
			    	            <img :src="property.thumbnail" alt="" />
			    	        </div>
			    	        <div class="order-detail">
			    	            <p>
			    	              {{property.commodity_title}}
			    	            </p>
			    	            <p class="detail">
			    	                <span class="explain-text" v-for="(item, index) in property.options">{{item.cn_attr_name}}: {{item.cn_option_name}}</span>
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
			            ￥{{freight}}
			          </p>
			        </div>
			      </div>
			    </div>
			    <div class="order shouldpay" style="">
			      <div class="order-inner vertical-middle">
			        <div class="price vertical-middle">
			          <p>
			            应付：￥<span class="order_total_price">{{total_price}}</span>
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
	.explain-text {
	  margin-right: 10px;
	}
</style>
<script>
import HeadBar from './HeadBar'
import { mapGetters, mapActions } from 'vuex'
import { generate } from '../util/general'
import shop from '../api/shop'

export default {

	components: {
		HeadBar
	},
	data () {
		return {
			isShow: false,
			address: false,
			freight: 0,
			confirmOrderData: [],
			total_price:'',
			count:''
		}
	},
	computed: {
		...mapGetters ({
        chooseAddr: 'chooseAddr',
        defaultAddress: 'defaultAddress',
        selectedData: 'selectedData',
        immOrderId: 'immOrderId',
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
			} else {
				return this.$router.push({
					name: 'address'
				})
			}
		},
		makePurchase () {
			var order_ids = JSON.parse(localStorage.order_id)
			// var order_ids = this.$store.getters.selectedData.selectedItemList.map(item => item.order_id)
			var _self = this
			shop.orderPay({
				params: JSON.stringify({'address_id': this.CchooseAddr.id, order_ids: order_ids}),
				cb: data => {
					if(data.code!=0){
            if(data.code==30005){ //用户未登陆, 直接跳转到登陆认证接口，并带上当前的url,认证登陆完毕再跳转>回来
            	window.location.href="http://preseller.gsteps.cn/api/user/oauth"+"?current_url="+escape(window.location.href)
            }
          }else{
          	WeixinJSBridge.invoke(
          		'getBrandWCPayRequest', data.res.appapi_params,
	          	 function(res){
	          			if(res.err_msg == "get_brand_wcpay_request:ok" ) {
	          				_self.$router.push('/')
	          			}
	          			if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
	          				alert('支付被取消');
	          			}
	          			if(res.err_msg == "get_brand_wcpay_request:fail" ) {
	          				alert(JSON.stringify(res))
	          			}
	          		}
          		);
          }
				}
			})
		}
	},
	beforeRouteLeave (to, from, next) {
		next()
	},
	mounted () {
		this.isShow = false
	},
	created () {
		var _self = this;

		var order_ids = JSON.parse(localStorage.order_id)
		var isFromImm = JSON.parse(localStorage.isFromImm)

		shop.getCartList({order_ids: order_ids, immediately: JSON.parse(isFromImm)}, function(data) {
	         _self.total_price = data.res.total_price
	         _self.confirmOrderData = data.res.orders
	         var total_count = 0;
	         _self.confirmOrderData.forEach((item) => {
	         	total_count = total_count + item.count
	         })
	         _self.count = total_count
    	})

		this.$store.dispatch('getAddress')

		// var order_ids = this.$store.getters.selectedData.selectedItemList.map(item => item.order_id)
		if(this.CchooseAddr) {
			shop.getFreight({"order_ids": order_ids, "address_id":this.CchooseAddr.id}, function(data) {
		 		_self.freight = data.res.freight;
			})
		}
		
	},
}
</script>