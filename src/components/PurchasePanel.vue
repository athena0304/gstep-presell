<template>
<div>

  <div class="weui-mask_transparent actionsheet__mask" id="mask" v-show="isShow" v-on:click = "isShow = false"></div>
  <div class="weui-actionsheet purchase-panel-wrapper" v-bind:class="{'weui-actionsheet_toggle':isShow}">
    <div class="order">
      <div class="order-inner vertical-middle">
        <div class="order-img show">
          <img src="~static/img/logo.png" alt="" />
        </div>
        <div class="order-detail">
          <p>
            {{purchaseDetail.name}}
          </p>
          <p class="">
            <span>￥{{purchaseDetail.price}}</span>
          </p>
        </div>
        <div class="close" v-on:click = "isShow = false">
          <i class='fa fa-times-circle'></i>
        </div>
      </div>
    </div>

    <div class="choose_type choose_property" v-for="(property, itemIndex) in purchaseDetail.properties">
      <div class="choose_title">
        {{property.name}}
      </div>
      <div class="choose_items">
        <div class="choose_item" v-for="(item, index) in property.type" v-bind:class="{'choose':property.current == index}" v-on:click="property.current = index" >{{item}}</div>
      </div>
    </div>



    <div class="choose_type choose_number">
      <div class="choose_title">
        购买数量
      </div>
      <div class="choose_items">
        <div class="operation minus">
          -
        </div>
        <div class="number_show">
          {{purchaseDetail.unit}}
        </div>
        <div class="operation add">
          +
        </div>
      </div>
    </div>
    <a class="order-footer order-detail-footer">
      确定
    </a>
  </div>
</div>
</template>

<script>
import '../less/detail.less'

export default {
  props: ['purchaseDetail','isShow'],
  data () {
    return {}

  },
  // methods: {
  //   changeItem: function(index, property, event) {

  //     // property.current = index;
  //     // this.purchaseDetail.properties[itemIndex].current = 2;
  //     // console.log(this.purchaseDetail.properties[itemIndex].current)
  //     // console.log("index: " + index)
  //   }
  // }
}
</script>

<style lang="less">

.purchase-panel-wrapper {
  background-color: #1b1615;
  color: #fff;
  font-size: 0.26rem;
}
</style>