<template>
    <div>
        <div class="main pre_index"> 
            <head-bar>
              <h3 class="title">购物袋</h3>
            </head-bar>
            <div class="order" v-for="(property, itemIndex) in cartListData">
                <div class="order-inner vertical-middle">
                    <input type="checkbox" :value="property.order_id" class="checkbox-toggle" v-model="checkedItems" @change="selectItem">
                    <div class="order-img">
                        <img :src="'http://preseller.gsteps.cn/' + property.thumbnail" alt="" />
                    </div>
                    <div class="order-detail">
                        <p>
                          {{property.commodity_title}}
                        </p>
                        <p class="detail">
                            <span v-for="(item, index) in property.options">{{item.cn_attr_name}}: {{item.cn_option_name}}</span>
                        </p>
                    </div>
                    <div class="price vertical-middle">
                        <p>￥{{property.price}}</p>
                        <p>×{{property.count}}</p>
                        <p class="close_order">
                            <i class='fa fa-times-circle'></i>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="order-footer">
          <div class="order-inner vertical-middle">
            <div class="choose">
              <!-- <input type="checkbox" name="" id=""> <span>全选</span> -->
              <div class="checkbox checkall"><input type="checkbox" class="checkbox-toggle" v-model="slelectAll"></div><span>全选</span>
            </div>
            <div class="order-detail">

            </div>
            <div class="price vertical-middle">
              <div class="price-detail">
                <p>
                  合计：{{selectedData.selectedPrice}}￥<span class="total_price"></span>
                </p>
                <p class="detail">
                  已选<span class="final_choose_number">{{selectedData.selectedCount}}</span>件 不包含运费
                </p>
              </div>
              <div class="">
                <a href="javascript:;" class="weui-btn weui-btn_mini weui_btn_plain_primary purchase_to_order" @click="goToBuy">立即购买</a>
              </div>

            </div>
          </div>

        </div>
    </div>

</template>

<script>
    import HeadBar from './HeadBar'
    import shop from '../api/shop'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data() {
            return{
                icircleObject: {
                    'weui-icon-circle': true,
                    'weui-icon-success': false
                },
                // checkedItems: [],
                // slelectAll: false
            }
        },
        computed: {
            ...mapGetters ({
                cartListData: 'cartListData',
                selectedData: 'selectedData',
            }),
            slelectAll: {
                get: function() {
                    return this.selectedData.selectedItemList.length == this.cartListData.length
                },
                set (val) {
                    if(val) {
                        this.checkedItems = this.cartListData.map(function(item) {
                        return item.order_id
                        })
                    } else {
                        this.checkedItems = []
                    }
                    this.$store.dispatch('changeSelectItem', this.checkedItems)
                }
            },
        },
      methods: {
        selectItem() {
            this.$store.dispatch('changeSelectItem', this.checkedItems)
        },
        goToBuy() {
          if(this.$store.getters.selectedData.checkedItemIds.length !== 0 ) {
            // console.log("gotobuy")
            this.$router.push({ name: 'ConfirmOrder'})
          }
        }
      },
      created() {
          var _self = this;
          shop.getCartList({}, function(data) {
             _self.$store.dispatch('initCartData', data.res)
         })
          this.checkedItems = this.selectedData.checkedItemIds;
          // this.slelectAll = !(this.checkedItems.length === this.cartListData.length)

      },
      components: {
          HeadBar
      }
  }
</script>
<style lang="less" scoped>
  .order {
      height: 1.48rem;
      background-color: rgba(50, 48, 48, 0.7);
      font-size: 0;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      color: #fff;
      width: 100%;
      box-sizing: border-box;
  }
  .order.yunfei {
      height: 0.98rem;
  }
  .order.comment {
      height: 0.98rem;
      color: #fff;
  }
  .order.comment input {
      width: 5.7rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      background-color: #3d3b3a;
      border: none;
      border: 1px solid #808080;
      border-radius: 5%;
      color: #fff;
  }
  .order.shouldpay {
      height: 0.98rem;
  }
  .order.shouldpay span{
      color: #ffb400;
      font-weight: bold;
  }
  .order-inner >div{
      font-size: 0.26rem;
      display: inline-block;
      vertical-align: middle;
  }
  .order-img {
      margin-left: 0.3rem;
      width: 1.1rem;
      height: 1.1rem;
      margin-right: 0.2rem;
  }
  .order-img.show {
      margin-left: 0;
  }
  .order-img img {
      width: 100%;
      height: 100%;
  }
  .order .close {
      position: absolute;
      top: 0;
      right: 0;
  }
  .order .close img {
      width: 0.3rem;
  }

  .order-detail {
      color: #fff;
  }
  .order-detail p {
      font-size: 0.26rem;
  }
  .order-detail p.detail {
      font-size: 0.18rem;
      color: #999999;
  }
  .order-detail p:nth-child(1){
      margin-bottom: 0.2rem;
  }
  .order .price {
      position: absolute;
      right: 0;
  }
  .order .price p {
      color: #fff;
      font-size: 0.18rem;
      text-align: right;
  }
  .order .price p:not(:nth-child(1)) {
      margin-top: 0.1rem;
  }
  .order .price p img {
      width: 0.3rem;
  }

  .pre_index.order-footer {
      font-size:14px;
      /*width: 100%;*/
      height: 1.2rem;
      background-color: #1b1615;
      padding-top: 0.05rem;
      box-sizing: border-box;
  }
  .main.pre_index .order-footer.order-detail-footer {
      height: auto;
      border-radius: 0 0 0 0;
      display: block;
      width: 100%;
      text-align: center;
      line-height: 1.2rem;
      color:#000;
      background-color: #ffb400;
  }
  .main.pre_index .order-footer {
      position: relative;
      bottom: 0;
  }
  .order-footer .choose {
      color: #fff;
      padding-left: .3rem;
  }
  .order-footer .choose span {
      display: inline-block;
      /*vertical-align: top;*/
      vertical-align: middle;
      margin-left: 0.2rem;
  }
  .order-footer .price {
      position: absolute;
      right: 0;
  }
  .order-footer .price div {
      display: inline-block;
      vertical-align: middle;
  }
  .order-footer .price div.price-detail {
      margin-right: 0.3rem;
  }
  .order-footer .price .price-detail p {
      color: #cacaca;
      font-size: 0.18rem;
      text-align: right;
  }
  .order-footer .price .price-detail p:nth-child(1) {
      margin-bottom: 0.1rem;
      font-size: 0.28rem;
      color: #fff;
  }
  .choose_type {
      padding-left: 0.3rem;
      padding-bottom: 0.3rem;
      background-color: rgba(61, 59, 58, 0.5);
  }
  .choose_type.choose_number {
      padding-bottom: 0;
      position: relative;
      height: 2.35rem;
  }
  .choose_type.choose_number .choose_items {
      position: absolute;
      right: 0.3rem;
      bottom: 0.3rem;
      font-size: 0;
  }
  .choose_type.choose_number .choose_items div {
      display: inline-block;
      vertical-align: middle;
      width: 0.6rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.36rem;
      font-weight: bold;
  }
  .choose_type.choose_number .choose_items div.operation {
      width: 0.8rem;
      border: 1px solid #e6e6e6;
      color: #fff;
      line-height: 0.6rem;
  }
  .choose_type.choose_number .choose_items div.number_show {
      color: #000;
      background-color: #ffb400;
      border: 1px solid #ffb400;
  }


  .choose_title {
      font-size: 0.26rem;
      color: #fff;
      height: 0.6rem;
      line-height: 0.6rem;
  }
  .choose_items {
      font-size: 0;
  }
  .choose_item {
      font-size: 0.26rem;
      display: inline-block;
      vertical-align: top;
      margin-right: 0.2rem;
      color: #fff;
      width: 1.1rem;
      height: 0.6rem;
      text-align: center;
      line-height: 0.6rem;
      border: 1px solid #e6e6e6;
  }
  .choose_item.choose {
      color: #000;
      background-color: #ffb400;
      border-color: #ffb400;
  }
  .choose_item:hover {
      color: #000;
      background-color: #ffb400;
      border-color: #ffb400;
  }

  .order-footer {
    width: 100%;
    margin: 0 auto;
    font-size: 14px;
    /* width: 100%; */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.2rem;
    background-color: #1b1615;
    padding-top: 0.05rem;
}
.order-footer .choose span {
    display: inline-block;
    /* vertical-align: top; */
    vertical-align: middle;
    margin-left: 0.2rem;
}

.order-footer .price .price-detail p:nth-child(1) {
    margin-bottom: 0.1rem;
    font-size: 0.28rem;
    color: #fff;
}

.order-footer .price .price-detail p {
    color: #cacaca;
    font-size: 0.18rem;
    text-align: right;
}
.checkall {
    display: inline-block;
}

.checkbox-toggle {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    border: none;
    -webkit-appearance: none;
    appearance: none;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font: normal normal normal 14px/1 weui;
    background: none;
    margin: auto 0;

    &:after {
        font-size: 23px;
        color: #ffb400;
    }

}

.checkbox-toggle:after {
    content: "\EA01";
}

.checkbox-toggle:checked:after {
    content: "\EA06";
}


</style>