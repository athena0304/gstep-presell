<template>
	<div>
		<head-bar>
			<h3 class="title">我的地址</h3>
		</head-bar>
		<div class="addressList">
			<div class="main addresses">
			  <div class="main-body">
					<div class="order addresses address" v-for='(item, index) in addressList'>
						<!-- <div class="checkbox checksimple choose_checkobx">
						  <img src="" alt="">
						</div> -->
					  <div class="order-inner vertical-middle" @click='choose(item)'>
					  	<label @click="chooseDefult(item)"><span v-if="item.default" class="choose circle"></span><span v-else class="circle unchoose"></span>默认地址</label>
					    <div class="order-detail address-detail">
					      <p>
					        <span v-if="item.default" class="default">【默认】</span><span class="name">{{item.name}}</span><span class="phone">{{item.phone}}</span>
					      </p>
					      <p class="detail">
					        {{item.province|city}};{{item.municipality|city}};{{item.region|city}};{{item.address}}
					      </p>
					    </div>
					    <div class="price vertical-middle">
					    	<i class='fa fa-edit'></i>
					    	<i class='fa fa-times-circle'></i>
					    </div>
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
	</div>
	
	<!-- <div class="address_list">
		<ul>
			<li v-for='(item, index) in addressList'>
			<div class='addressInfo address' @click='choose(item)'>
				<p>
					<span>手机: {{item.phone}}; 姓名：{{item.name}}</span>
				</p>
				<p>
					<span>{{item.province|city}};{{item.municipality|city}};{{item.region|city}};{{item.address}}</span>
					<span v-if="item.default">默认</span>
				</p>
			</div>
			<div class='address'>
				<label @click="chooseDefult(item)"><span v-if="item.default" class="choose circle"></span><span v-else class="circle unchoose"></span>默认地址</label>
				<a href="javascript:;" @click='editAddress(item)'>编辑</a>
				<a href="javascript:;" @click='deleteAddress(item)'>删除</a>
			</div>
			<li>
		</ul>
		<a href="javascript:" @click="newAddress">添加新地址</a>
	</div> -->
</template>
<style src="../less/purchase.less"></style>
<style lang='less' scoped>
	.addressList {
		cursor: pointer;
		.address {
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
				&.choose {
					background-color: #f90;
				}
			}
		}
	}
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
</style>
<script>
import HeadBar from './HeadBar'
import { mapGetters, mapActions } from 'vuex'
// import { addressList } from '../vuex/getters'
// import { chooseAddress, getAddress, deleteAddressAction, chooseDefultAction } from '../vuex/actions'
export default {
	components: {
		HeadBar
	},
// 	vuex: {
// 		getters: {
// 			addressList
// 		},
// 		actions: {
// 			chooseAddress,
// 			getAddress,
// 			deleteAddressAction,
// 			chooseDefultAction
// 		}
// 	},
	computed: {
		...mapGetters({
			addressList: 'addressList'
		})
	},
	methods: {
		choose (item) {
			// this.chooseAddress(item, this.$router)
		},
		newAddress () {
// 			this.$router.push({
// 				name: 'address',
// 				params: {
// 					type: 'default',
// 					data: {
// 						province: '1;北京',
// 						municipality: '1;东城区',
// 						region: '0;请选择'
// 					}
// 				}
// 			})
		},
// 		deleteAddress (item) {
// 			var params = {
// 				address_id: item.id
// 			}
// 			this.deleteAddressAction(params)
// 		},
 		chooseDefult (item) {
			var params = {
				address_id: item.id
			}
			this.$store.dispatch('chooseDefultAction', params)
 		}
// 		editAddress (item) {
// 			this.$router.push({
// 				name: 'address',
// 				params: {
// 					type: 'edit',
// 					data: {
// 						address_id: item.id,
// 						name: item.name,
// 						phone: item.phone,
// 						address: item.address,
// 						province: item.province,
// 						municipality: item.municipality,
// 						region: item.region
// 					}
// 				}
// 			})
// 		}
	},
	created () {
		this.$store.dispatch('getAddress')
	}
}
</script>