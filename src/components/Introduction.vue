<template>
<div>
	<div class="productImg">
	    <div class="img_wrapper">
	      <img :src="res.navigation_img" alt="">
	    </div>
	</div>

	<div class="short_area area">
		<div class="splitbar">简介</div>
	</div>
	<div class="context_wrapper simple_context_wrapper">
		<div class="context_inner simple_contxt_inner">
			{{res.brief_introduction}}
		</div>
	</div>
	<div class="short_area area">
		<div class="splitbar">商品怎么保证</div>
	</div>
	<div class="context_wrapper simple_context_wrapper">
		<div class="context_inner simple_contxt_inner">
			{{res.guarantee}}
		</div>
	</div>
	<div class="short_area area date">
		<div class="splitbar">团队日常活动</div>
	</div>

	<div class="" v-for="photo in res.activity_photos">
		<!-- <img src="/static/img/play.png" alt="" /> -->
		<img :src="photo" alt="" />
	</div>
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
		shop.getIntroduction(function(data) {
			console.log(data.res)
			_self.res = data.res

		})
	}
}
</script>