<template>
<div>
	<div class="order_wrapper" v-for="(item, index) in order_info">
	  <div class="order-info">
	    <div class="order-info-price status">待收货</div>
	    <div class="order-info-number">订单编号：{{item.order_id}}</div>
	    <div class="order">
	      <div class="order-inner vertical-middle">
	        <div class="order-img show">
	          <img :src="item.thumbnail" alt="" />
	        </div>
	        <div class="order-detail">
	          <p>
	            {{item.commodity_title}}
	          </p>
	          <p class="detail">
	              <span v-for='(prop, index1) in item.options'>{{prop.cn_attr_name}}: {{prop.cn_option_name}}；</span>
	            <!-- <span>颜色：灰色</span><span>尺码： XL</span> -->
	          </p>
	        </div>
	        <div class="price vertical-middle">
	          <p>
	            ￥{{item.price}}
	          </p>
	          <p v-if='item.count' v-text='"x"+item.count'></p>
	        </div>
	      </div>
	    </div>
	  </div>
	  <div class="order-info">
	    <div class="order-info-price">已付：￥{{item.price}}</div>
	    <div class="order-info-number">共{{item.count}}件商品</div>
	  </div>
	  <div class="order-wuliu">
	    <div class="info"><div class="wuliu">物流信息</div><p class="">
	    </p></div>
	    <div class="buttons"><div class="button" @click='showDialog($event, item)'>删除订单</div></div>
	  </div>
	</div>
	<div class="deleteOrder" v-show="showDeleteOrder">
	    <div class="weui-mask"></div>
	    <div class="weui-dialog">
	        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
	        <div class="weui-dialog__bd">确定要删除该订单吗？</div>
	        <div class="weui-dialog__ft">
	            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="showDeleteOrder=false">取消</a>
	            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click='makeDeleteOrder'>确定</a>
	        </div>
	    </div>
	  </div>	
		<toast :message='showMessage' :show='showToast' v-on:fadeOut='fadeOut' :callback='toastCallback'></toast>	
	</div>
</div>
</template>
<style scoped lang='less'>
	.weui-dialog__btn {
		line-height: inherit;
	}
	.order-wuliu {
		height: 0.98rem;
		line-height: 0.98rem;
		background-color: rgba(50, 48, 48, 0.7);
		.info {
			float: left;
			padding-left: 0.3rem;
		}
		.buttons {
			float: right;
			padding-right: 0.3rem;
			font-size: 0.28rem;
			.button {
			  text-align: center;
			  width: 1.2rem;
			  padding-left: 0.3rem;
			  padding-right: 0.3rem;
			  border: 1px solid #fff;
			  line-height: 0.55rem;
			  display: inline-block;
			  height: 0.55rem;
			  margin-left: 0.2rem;
			}
		}
		div {
			height: 0.98rem;
			line-height: 0.98rem;
		}
	}
</style>
<script>
	import shop from '../../api/shop'
	import Toast from '../Toast'
	export default {
		data () {
			return {
				order_info: {},
				deleteOrder: {},
				showDeleteOrder: false,
				showMessage: "成功",
				showToast: false,
				toastCallback: null
			}
		},
		components: {
			Toast
		},
		methods: {
			showDialog (event, item) {
				this.showDeleteOrder = true
				this.deleteOrder = item
				event.stopPropagation()
			},
			fadeOut () {
				this.showToast = false
			},
			makeDeleteOrder () {
				var _self = this
				let { showToast, showMessage } = this
				var order_ids = [this.deleteOrder.order_id]
				var callback = fn => {
					this.toastCallback = fn || (function() {})
					this.showToast = true
					this.showMessage = '删除订单成功'
				}
				shop.deleteOrder({
					params: { order_ids, delete: true },
					cb: data => callback(() => data.msg == 'success' && this.order_info.splice(this.order_info.findIndex(item => item.order_id === this.deleteOrder.order_id), 1))
				})
				this.showDeleteOrder = false
			}
		},
		created () {
			const STATUS = 5
			let params = {
				status: STATUS
			}
			shop.getOrder(params, data => this.order_info = data.res.orders)
			this.$emit('getCurrent', 'wait_receive')
		}
	}
</script>