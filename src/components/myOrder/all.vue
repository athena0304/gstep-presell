<template>
	<div>sss</div>
</template>
<style></style>
<script>
	import shop from '../../api/shop'
	export default {
		data () {
			return {}
		},
		created () {
			const STATUS = 8
			let params = {
				status: STATUS
			}
			shop.getOrder(params, data => console.log(data))
		}
	}
</script>