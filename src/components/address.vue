<template>
	<div class="main new_addresses">
		<head-bar>
			<h3 class="title">添加／编辑地址</h3>
		</head-bar>
	  <div class="main-body">
	    <div class="order comment" style="">
	      <div class="order-inner vertical-middle">
	        <div class="commet-context name-title">
	          <p>
	            姓名：
	          </p>
	        </div>
	        <div class="input-context commet-context">
	          <input class="name" type="text" name="" id="" v-model="name">
	        </div>
	      </div>
	    </div>

	    <div class="order comment" style="">
	      <div class="order-inner vertical-middle">
	        <div class="commet-context name-title">
	          <p>
	            手机号码：
	          </p>
	        </div>
	        <div class="input-context commet-context">
	          <input class="phone" type="text" name="" id="" v-model="phone">
	        </div>
	      </div>
	    </div>
	    <div id="distpicker_new">
				<add-address :addInfo='addressInfo'></add-address>
	    </div>
	    <div class="order comment" style="">
	      <div class="order-inner vertical-middle">
	        <div class="commet-context name-title">
	          <p>
	            详情地址：
	          </p>
	        </div>
	        <div class="input-context commet-context">
	          <input class="phone" type="text" name="" id="" v-model="address">
	        </div>
	      </div>
	    </div>
	    <div class="order-footer">
	      <div class="order-footer order-detail-footer add_new_finish" v-if='addressInfo.type === "default"' @click="addressAdd">
	        确定添加
	      </div>
	      <div class="order-footer order-detail-footer add_new_finish" v-else-if='addressInfo.type === "edit"' @click="addressEdit">
	        确定修改
	      </div>
	    </div>
	  </div>
	  <toast :message='showMessage' :show='showToast' v-on:fadeOut='fadeOut' :callback='toastCallback'></toast>	
	</div>
	
</template>
<script>
import HeadBar from './HeadBar'
import addAddress from './addAddress.vue'
import Toast from './Toast'
import { mapGetters, mapActions } from 'vuex'
export default {
	components: {
		HeadBar,
		addAddress,
		Toast
	},
	data () {
		return {
			addressInfo: {},
			name: '',
			phone: '',
			address: '',
			address_id: '',
			showMessage: "成功",
			showToast: false,
			toastCallback: null
		}
	},
	created () {
		this.addressInfo = this.$route.params.data ? this.$route.params : {
			type: 'default',
			data: {
				province: '1;北京',
				municipality: '1;东城区',
				region: '0;请选择'
			}
		}
		this.name = this.addressInfo.data.name
		this.phone = this.addressInfo.data.phone
		this.address = this.addressInfo.data.address
		this.address_id = this.addressInfo.data.address_id
	},
	methods: {
		fadeOut () {
			this.showToast = false
		},
		addressAdd () {
			var _self = this
			var param = Object.assign({}, {
				name: this.name,
				phone: this.phone,
				address: this.address,
				default: false,
				country: '中国'
			}, this.addressInfo.params)
			this.$store.dispatch('addAddressAction', {
				param,
				router: this.$router,
				callback (fn) {
					_self.toastCallback = fn || (function() {})
					_self.showToast = true
					_self.showMessage = '添加地址成功'
				}
			})
		},
		addressEdit () {
			var _self = this
			var param = Object.assign({}, {
				address_id: this.address_id,
				name: this.name,
				phone: this.phone,
				address: this.address,
				country: '中国'
			}, this.addressInfo.params)
			this.$store.dispatch('editAddressAction', {
				param,
				router: this.$router,
				callback (fn) {
					_self.toastCallback = fn || (function() {})
					_self.showToast = true
					_self.showMessage = '修改地址成功'
				}
			})
		}
	}
}
</script>
<style lang='less'>
	.form-group {
		margin-bottom: 10px;
		input {
			width: 200px;
			height: 20px;
		}
	}
	.name-title {
		width: 1.6rem;
	}

	.new_addresses .order.comment input,  .order.comment select{
	    width: 4.6rem;;
	    height: 0.6rem;
	    margin-left: 0.3rem;
	    background-color: #3d3b3a;
	    border: none;
	    border: 1px solid #808080;
	    /* border-radius: 5%; */
	    color: #fff;
	    -webkit-appearance:none;
	}
	.address_edit .order.comment input,  .order.comment select{
	    width: 4.6rem;;
	    height: 0.6rem;
	    margin-left: 0.3rem;
	    background-color: #3d3b3a;
	    border: none;
	    border: 1px solid #808080;
	    /* border-radius: 5%; */
	    color: #fff;
	    -webkit-appearance:none;
	}
</style>
