<template>
<div>
	<head-bar>
	  <h3 class="title">预售规则</h3>
	</head-bar>
	<div class="home-main-body" v-for="item in ruleData">
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
    <router-link to="/my-order"><button>>Go to Foo</button</router-link>
</div>
</template>
<script>
import shop from '../api/shop'
import HeadBar from './HeadBar'
export default {
	components: {
          HeadBar
      },
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