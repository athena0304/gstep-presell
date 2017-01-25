<template>
<div class='main'>
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
				<div class="tip">{{res.cart_count}}</div>
			</div>
		</router-link>
		<div class="buttonArea">
	        <a href="javascript:;" class="weui-btn weui-btn_mini weui_btn_plain_primary show_detail add_to_cart" @click="showActionSheet('addCart')">加入购物袋</a>
	        <a href="javascript:;" class="weui-btn weui-btn_mini weui_btn_plain_primary show_detail purchase_to_order" @click="showActionSheet('purchase')">立即购买</a>
      </div>
	</div>
	    <purchase-panel  v-bind:isShow = "isShow" v-on:closePanel="closePanel" v-bind:comfirmType = "comfirmType"></purchase-panel>
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
			purchaseDetail:{},
			comfirmType: ''
		}
	},
	components: {
		PurchasePanel
	},
	methods: {
		closePanel: function() {
			this.isShow = false;
		},
		showActionSheet: function (type, event) {
			var _self = this;
			this.comfirmType = type;
			shop.getPurchaseDetail(function(data) {
				_self.purchaseDetail = data.res;

				_self.isShow = true;
				_self.$store.dispatch('initData', _self.purchaseDetail)
			})
			
		}
	},
	beforeRouteEnter (to, from, next) {
		shop.checkLogin({
			params: {},
			cb: data => {
				if(!data.res.login){
		      return window.location.href="http://preseller.gsteps.cn/api/user/oauth"+"?current_url="+escape(window.location.href)
		    }
		    next()
			}
		})
  },
	created () {
		// this.$store.dispatch('checkLogin', {})
		var _self = this;
		shop.getHomeData(function(data) {
			_self.res = data.res

		})
	}
}

</script>
<style lang="less" src="../less/home.less">

</style>