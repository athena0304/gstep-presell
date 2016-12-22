<template>
<div>
	<div class="main-body">
		<div class="productTitle">
		    <h1 class="title">{{res.title}}</h1>
		    <div class="sub_wrapper">
		        <div class="in left">
		            <span class="bracket"></span>
		            <span class="line"></span>
		        </div>
		        <div class="in right">
		            <span class="bracket"></span>
		            <span class="line"></span>
		        </div>
		        <h2 class="subheading">{{res.brief}}</h2>
		    </div>
		</div>

		<div class="product-wrapper">

		    <div class="productImg">
		        <img src="~static/img/title.png" alt="">
		    </div>

		    <div class="product-info">
		        <div class="product-info-title">
		            <div class="product-info-count">
		                <p class="total_count">预售{{res.presell_count}}件</p>
		                <p class="min_count">满{{res.satisfy_count}}件发货</p>
		            </div>
		            <div class="product-info-price">
		                <span class="unit">$</span>
		                <span class="price">86</span>
		            </div>
		        </div>

		        <div class="product-info-progress">
		            <div class="progress-wrapper">
		                <div class="progress-inner" v-bind:style="{width: res.sold_count + '%'}">
		                </div>
		            </div>
		            <div class="progress-text">{{res.sold_count}} / 100
		            </div>
		        </div>
		    </div>
		</div>

		<router-link to="/introduction">
		<div class="product_company area">
		    <div class="logo"><img src="~static/img/logo.png" alt=""></div>
		    <div class="company_text">{{res.publisher}}</div>
		    <div class="instruction">品牌方</div>
		    <div class="arrow">
		    </div>
		</div>
		</router-link>

		<router-link to="/presell-rule">
			<div class="pre_rule area">
			    <div class="splitbar">预售规则</div>
			    <div class="arrow">
			    </div>
			</div>
		</router-link>

		<div class="recomand area">
		    <div class="splitbar">靠谱推荐</div>
		</div>

		<ul class="recomand_items">
		    <li v-for="recommend in res.recommends" class="recomand_item" style="">
		        <div class="img"><img :src="recommend.profile" alt=""></div>
		        <div class="user_context">
		            <p><span>{{recommend.name}}  | </span>{{recommend.job}}</p>
		            <p class="small text-nowrap">{{recommend.content}}</p>
		        </div>
		    </li>
		</ul>
		<div class="company-info">
		    <div class="title area">
		        <div class="splitbar">商品信息</div>
		    </div>
		</div>
	</div>
	<div class="footer button_active">
		<router-link to="/shopping-bag">
			<div class="haha">
				<div class="tip">5</div>
			</div>
		</router-link>
		<div class="buttonArea">
	        <a href="javascript:;" class="weui_btn weui_btn_mini weui_btn_plain_primary show_detail add_to_cart">加入购物袋</a>
	        <a href="javascript:;" class="weui_btn weui_btn_mini weui_btn_plain_primary show_detail purchase_to_order" v-on:click="showActionSheet">立即购买</a>
      </div>
	</div>
<!-- 	<div id="actionSheet_wrap">
		<div class="weui-mask_transparent actionsheet__mask" id="mask"></div> -->
		<div class="weui-actionsheet" v-bind:class="{'weui-actionsheet_toggle':isShow}" id="iosActionsheet">
	        <purchase-panel v-bind:purchaseDetail = "purchaseDetail"></purchase-panel>
	    </div>
<!-- 	</div> -->
</div>
</template>

<script>
import shop from '../api/shop'
import PurchasePanel from './PurchasePanel'

export default {
	data () {
		return {
			res: {},
			isShow: false,
			purchaseDetail:{}
		}
	},
	components: {
		PurchasePanel
	},
	methods: {
		showActionSheet: function (event) {
			var _self = this;
			shop.getPurchaseDetail(function(data) {
				console.log(data.res)
				_self.purchaseDetail = data.res
				_self.isShow = true;

			})
			
		}
	},
	created () {
		var _self = this;
		shop.getHomeData(function(data) {
			console.log(data.res)
			_self.res = data.res

		})
	},
	
}

</script>
<style lang="less" src="../less/home.less">

</style>