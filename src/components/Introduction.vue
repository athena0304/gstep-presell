<template>
<div>
	<div v-if="res.banner" class="productImg">
	    <div class="img_wrapper">
	      <img :src="res.banner" alt="">
	    </div>
	</div>
	<div class="home-main-body">
		<div v-for="item in res.content">
			<div v-if="item.title" class="short_area area">
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
	</div>
	
</div>
	
</template>
<style scoped>
.area {
	margin-bottom: 0;
}
</style>
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