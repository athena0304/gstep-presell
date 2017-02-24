<template>
<div>
	<div class="order_wrapper" v-for="(item, index) in order_info">
	  <div class="order-info">
	    <div class="order-info-price status">待发货</div>
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
	  <div class="order-info-progress">
	    <div class="order-info-detail">
	      <span v-if="item.stop_sell" class="status">预售已停止</span><span v-else class="status">预售进行中</span><span class="tip">{{item.satisfy_count}}件发货</span>
	    </div>
	    <div class="product-info-progress">
	      <div class="progress-wrapper progress_highlight" >
	        <div class="progress-inner progress_highlight" :style="'width:' + item.sold_count/item.presell_count*100 + '%'"></div>
	      </div>
	      <div class="progress-text progress_highlight">{{item.sold_count}} / {{item.presell_count}}</div>
	    </div>
	  </div>
	</div>
</template>

<script>
	import shop from '../../api/shop'
	export default {
		data () {
			return {
				order_info: {},
				deleteOrder: {}
			}
		},
		created () {
			const STATUS = 4
			let params = {
				status: STATUS
			}
			shop.getOrder(params, data => this.order_info = data.res.orders)
			this.$emit('getCurrent', 'wait_send')
		}
	}
</script>