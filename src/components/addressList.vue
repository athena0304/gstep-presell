<template>
	<div>
		<head-bar>
			<h3 class="title">我的地址</h3>
		</head-bar>
		<div class="addressList">
			<div class="main addresses">
			  <div class="main-body">
					<div class="order addresses address" v-for='(item, index) in addressList'>
					  <div class="order-inner address-context" @click='choose(item)'>
					    <div class="order-detail address-detail">
					      <p>
					        <span v-if="item.default" class="default">【默认】</span><span class="name">{{item.name}}</span><span class="phone">{{item.phone}}</span>
					      </p>
					      <p class="detail">
					        {{item.province|city}};{{item.municipality|city}};{{item.region|city}};{{item.address}}
					      </p>
					    </div>
					  </div>
					  <div class="order-inner operation">
					  <p class="operation-left">
					  	<i v-if="item.default" class="weui-icon-success"></i>
					  	<i @click="chooseDefult(item)" v-else class="weui-icon-circle"></i>
					  </p>
					  <p class='operation-right'>
				  		<i class='fa fa-edit' @click="editAddress(item)"></i>
				  		<i class='fa fa-times-circle' @click="showDialog($event, item)">
					  	</p>
					  </div>
					</div>
			  </div>
			</div>
		</div>
		<div class="order-footer">
		  <div class="order-footer order-detail-footer add_new_address" @click="newAddress">
		    添加新地址
		  </div>
		</div>
		<div id="deleteAddress" v-show="showDeleteAddress">
	    <div class="weui-mask"></div>
	    <div class="weui-dialog">
	        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
	        <div class="weui-dialog__bd">确定要删除该地址吗？</div>
	        <div class="weui-dialog__ft">
	            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="showDeleteAddress=false">取消</a>
	            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click='deleteAddressAction'>确定</a>
	        </div>
	    </div>
	  </div>	
		<toast :message='showMessage' :show='showToast' v-on:fadeOut='fadeOut' :callback='toastCallback'></toast>	
	</div>
</template>
<!-- <style src="../less/purchase.less" scoped></style> -->
<style lang='less' scoped>
	.order-detail-footer {
		position: absolute;
		bottom: 0;
	}
	.main {
		top: 0.96rem;
	}
	.address_edit {
		width: 0.2rem;
		margin-right: 0.2rem;
	}
	.weui-dialog__btn {
		line-height: inherit;
	}
	[class*=" weui-icon-"]:before, [class^=weui-icon-]:before {
		vertical-align: middle;
	}
</style>
<style lang='less' scoped>
	.order {
		line-height: 1.5rem;
		height: auto;
		padding-right: 0;
		padding: .3rem;
		padding-bottom: 0;
	}
	.operation {
		overflow: hidden;
		padding: .2rem 0;
		.operation-right {
			float:right;
		}
		.operation-left {
			float:left;
		}
	}
	.order-detail .default {
	  color: #ffb400;
	}
	.addressList {
		.address-context {
			margin-bottom: .2rem;
		}
		cursor: pointer;
		.address {
			margin-bottom: 0.3rem;
			&.addressInfo {
				display: inline-block;
				vertical-align: middle;
				width: 300px;
			}
			.circle {
				vertical-align: middle;
				display: inline-block;
				width: 0.4rem;
				height: 0.4rem;
				margin-right: 0.2rem;
				border: 1px solid #f90;
				border-radius: 50%;
				position: relative;
				&.choose {
					background-color: #f90;
				}
				&.choose:before {
					content: '√';
    			color: #fff;
					position: absolute;
					top: 50%;
					left: 50%;
					transform:translate(-50%, -50%);
					font-size: 0.2rem;
				}
			}
		}
		i {
			font-size: 0.3rem;
			margin-right: 0.2rem;
			color: #fff;
			vertical-align: middle;
			&.fa-edit:after {
				content: '编辑';
			}
			&.fa-times-circle:after {
				content: '删除';
			};
		}
		i:after {
			margin-left: 0.1rem;
			font-size: 0.25rem;
			content: '设为默认';
		}
	}
</style>
<script>
import HeadBar from './HeadBar'
import Toast from './Toast'
import { mapGetters, mapActions } from 'vuex'
// import { addressList } from '../vuex/getters'
// import { chooseAddress, getAddress, deleteAddressAction, chooseDefultAction } from '../vuex/actions'
export default {
	components: {
		HeadBar,
		Toast
	},
	data () {
		return {
			showDeleteAddress: false,
			deleteAddress: null,
			showMessage: "成功",
			showToast: false,
			toastCallback: null
		}
	},
	computed: {
		...mapGetters({
			addressList: 'addressList'
		})
	},
	methods: {
		fadeOut () {
			this.showToast = false
		},
		choose (item) {
			this.$store.dispatch('chooseAddress', {
				item,
				router: this.$router
			})
		},
		showDialog (event, item) {
			this.showDeleteAddress = true
			this.deleteAddress = item
			event.stopPropagation()
		},
		newAddress () {
			this.$router.push({
				name: 'address',
				params: {
					type: 'default',
					data: {
						province: '1;北京',
						municipality: '1;东城区',
						region: '0;请选择'
					}
				}
			})
		},
		deleteAddressAction () {
			var _self = this
			let { showToast, showMessage } = this
			var params = {
				param: {
					address_id: this.deleteAddress.id
				},
				callback (fn) {
					_self.toastCallback = fn || (function() {})
					_self.showToast = true
					_self.showMessage = '删除地址成功'
				}
			}
			this.showDeleteAddress = false
			this.$store.dispatch('deleteAddressAction', params)
		},
 		chooseDefult (item) {
 			var _self = this
 			let { showToast, showMessage } = this
			var params = {
				param: {
					address_id: item.id
				},
				callback (fn) {
					_self.toastCallback = fn || (function() {})
					_self.showToast = true
					_self.showMessage = '修改地址成功'
				}
			}
			event.stopPropagation()
			this.$store.dispatch('chooseDefultAction', params)
			
 		},
		editAddress (item) {
			event.stopPropagation()
			this.$router.push({
				name: 'address',
				params: {
					type: 'edit',
					data: {
						address_id: item.id,
						name: item.name,
						phone: item.phone,
						address: item.address,
						province: item.province,
						municipality: item.municipality,
						region: item.region
					}
				}
			})
		}
	},
	mounted () {
		
	},
	created () {
		this.$store.dispatch('getAddress')
	}
}
</script>