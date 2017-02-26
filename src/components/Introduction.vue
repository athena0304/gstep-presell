<template>
<div>

	<div v-for="item in res">
		<div class="short_area area">
			<div class="splitbar">{{item.title}}</div>
		</div>
		<div v-if="item.text" class="context_wrapper simple_context_wrapper">
			<div class="context_inner simple_contxt_inner">
				{{item.text}}
			</div>
		</div>
		<div v-if="item.image" class="productImg">
			<img  :src="item.image" alt="" />
		</div>
	</div>
<!-- 	<div class="productImg">
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
		<!-- <img :src="photo" alt="" />
	</div> --> 
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
			_self.res = data.res

		})
	}
}
</script>