<template>
<div>
	<div class="short_area area">
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
      </div>
</div>
</template>
<script>
import shop from '../api/shop'
export default {
    created() {
        shop.getpresellRule(function(data) {
            
        })
    }
}
</script>