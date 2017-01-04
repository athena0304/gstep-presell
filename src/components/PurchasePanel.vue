<template>
<div>

  <div class="weui-mask_transparent actionsheet__mask" id="mask" v-show="isShow" v-on:click = "closePanel"></div>
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
            <span>￥{{aaa}}</span>
          </p>
        </div>
        <div class="close" v-on:click = "closePanel">
          <i class='fa fa-times-circle'></i>
        </div>
      </div>
    </div>

    <div class="choose_type choose_property" v-for="(property, itemIndex) in purchaseDetail.properties">
      <div class="choose_title">
        {{property.name}}
      </div>
      <div class="choose_items">
        <div class="choose_item" v-for="(item, index) in property.type_cn" v-bind:class="{'choose':property.current == index}" v-on:click="changeItem(itemIndex, index)" >{{item}}</div>
      </div>
    </div>



    <div class="choose_type choose_number">
      <div class="choose_title">
        购买数量
      </div>
      <div class="choose_items">
        <div class="operation minus">
          <i class='fa fa-minus' @click="changeSpinner('minus')"></i>
        </div>
        <div class="number_show">
          {{num}}
        </div>
        <div class="operation add">
          <i class='fa fa-plus' @click="changeSpinner('plus')"></i>
        </div>
      </div>
    </div>
    <a class="order-footer order-detail-footer" @click="panelConfirm">
      确定
    </a>
  </div>
</div>
</template>

<script>
import '../less/detail.less'
import shop from '../api/shop'

import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['isShow', 'comfirmType'],
  data () {
    return {
        aaa: 0,
        num: 1
    }
  },
  watch: {
      'num' (val) {
            this.$store.dispatch('changeCount', val)
      }
  },
  computed: {
    ...mapGetters ({
        'aaa': 'price',
        purchaseDetail: 'initData',
    }),
  },
  methods: {
    closePanel () {
        this.$emit('closePanel')
    },
    changeItem(itemIndex, index) {
        // console.log(index)
        this.$store.dispatch('changeItem', {itemIndex,index})
        // this.$store.dispatch('changeItem', itemIndex, index)
    },
    changeSpinner(type) {
        switch (type) {
            case 'plus':
                this.num++
                break
            case 'minus':
                this.num--
                break
        }
    },
    panelConfirm(type) {
        var _self = this;
        switch (type) {
            case 'addCart':
                shop.getPrice(params, function(data) {
                    console.log(data.res)
                })
            case 'purchase':
                console.log(this.comfirmType)
                break

        }
    }
  }

}
</script>

<style lang="less">

.purchase-panel-wrapper {
  background-color: #1b1615;
  color: #fff;
  font-size: 0.26rem;
}
</style>