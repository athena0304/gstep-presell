<template>
<div>
<div class="productTitle">
  <h1 class="title">{{res.title}}</h1>
  <div class="sub_wrapper">
    <div class="in left">
      <span class="bracket"></span>
      <span class="line"></span>
    </div>
    <h2 class="subheading">{{res.brief}}</h2>
    <div class="in right">
      <span class="bracket"></span>
      <span class="line"></span>
    </div>
  </div>
</div>
<div class="productImg">
  <img src="/static/img/title.png" alt="">
</div>
<div class="product-info">
  <div class="product-info-title">
    <div class="line"></div>
    <div class="product-info-count">
      <p class="total_count">预售{{res.presell_count}}件</p>
      <p class="min_count">满{{res.satisfy_count}}件发货</p>
    </div>
    <div class="product-info-price"><span class="unit">$</span><span class="price">86</span></div>
  </div>

  <div class="product-info-progress">
    <div class="progress-wrapper">
      <div class="progress-inner"></div>
    </div>
    <div class="progress-text">{{res.sold_count}} / 100</div>
  </div>
</div>

<div class="product_company area">
  <div class="logo"><img src="/static/img/logo.png" alt=""></div>
  <div class="company_text">{{res.publisher}}</div>
  <div class="instruction">品牌方</div>
  <div class="arrow">
  </div>
</div>

<div class="pre_rule area">
  <div class="splitbar">预售规则</div>
  <div class="arrow">
  </div>
</div>

<div class="recomand area">
  <div class="splitbar">靠谱推荐</div>
</div>

<ul class="recomand_items">
  <li v-for="recommend in res.recommends" class="recomand_item" style="">
    <div class="img"><img src="/static/img/user2.png" alt=""></div>
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
<router-link to="/shopping-bag">购物袋</router-link>
</div>

</template>

<script>
import shop from '../api/shop'

export default {
	data: function() {
		return {
			res: {}
		}
	},
	created () {
		var _self = this;
		shop.getHomeData(function(data) {
			console.log(data.res)
			_self.res = data.res

		})
	}
}

</script>