<template>
<div>

  <div class="weui-mask_transparent actionsheet__mask" id="mask" v-show="isShow" v-on:click = "closePanel"></div>
  <div class="weui-actionsheet purchase-panel-wrapper" v-bind:class="{'weui-actionsheet_toggle':isShow}">
    <div class="order">
      <div class="order-inner vertical-middle">
        <div class="order-img show">
          <img :src="purchaseDetail.sample_img" alt="" />
        </div>
        <div class="order-detail">
          <p>
            {{purchaseDetail.title}}
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

    <div class="choose_type choose_property" v-for="(property, itemIndex) in purchaseDetail.attributes">
      <div class="choose_title">
        {{property.cn_attr_name}}
      </div>
      <div class="choose_items" >
        <div class="choose_item" v-for="(item, index) in property.options" v-bind:class="{'choose':item.default}" v-on:click="changeItem(itemIndex, index)" >{{item.cn_option_name}}</div>
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
    <a class="order-footer order-detail-footer" @click="panelConfirm()">
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
        // console.log(itemIndex)
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
    panelConfirm() {
        var _self = this;
        var type = this.comfirmType
        var params = {
			commodity_id: shop.COMMODITY_ID,
			selected_option_ids: this.$store.getters.selected_option_ids,
			count: this.num
		}
        switch (type) {
          	
            case 'addCart':
               
                shop.addToCart(params, function(data) {
                  _self.closePanel();
                  _self.$emit('changeCount', data.res.cart_count)
                })
                
                break;
            case 'purchase':
            	params.immediately = true;

            	shop.addToCart(params, function(data) {
            		localStorage.isFromImm = true;
            		var order_ids = new Array();
            		order_ids.push(data.res.order_id)
            		localStorage.order_id = JSON.stringify(order_ids)
                  	_self.$router.push({ name: 'ConfirmOrder'})
                })
         
                break;

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