<template>
<div>
	<div v-for="item in ruleData">
		<div class="short_area area">
			<div class="splitbar">{{item.title}}</div>
		</div>
		<div class="context_wrapper simple_context_wrapper">
			<div class="context_inner simple_contxt_inner">
				{{item.text}}
			</div>
		</div>
		<div v-if="item.image" class="productImg">
			<img  :src="item.image" alt="" />
		</div>
	</div>
	<!-- <div class="short_area area">
		<div class="splitbar">预售规则简介</div>
	</div>
	<div class="context_wrapper simple_context_wrapper">
		<div class="context_inner simple_contxt_inner">
			dfgdfgdfgdfgdfg
		</div>
	</div>
	<div class="short_area area">
		<div class="splitbar">怎么保证商家质量</div>
	</div>
	<div class="context_wrapper simple_context_wrapper">
		<div class="context_inner simple_contxt_inner">
			搜狗拼音输入法官网下载,荣获多个国内软件大奖的搜狗拼音输入法是一款打字超准、词库超大、速度飞快、外观
		</div>
	</div>
	<div class="short_area area">
		<div class="splitbar">退款规则</div>
	</div>
	<div class="context_wrapper simple_context_wrapper">
		<div class="context_inner simple_contxt_inner">
			搜狗拼音输入法官网下载,荣获多个国内软件大奖的搜狗拼音输入法是一款打字超准、词库超大、速度飞快、外观
		</div>
	</div> -->
    <router-link to="/my-order"><button>>Go to Foo</button</router-link>
</div>
</template>
<script>
import shop from '../api/shop'
export default {
  	data () {
  		return {
  			ruleData: ''
  		}
  	},
    created() {
    	var _self = this
        shop.getpresellRule(function(data) {
            _self.ruleData = data.res
        })
    }
}
</script>