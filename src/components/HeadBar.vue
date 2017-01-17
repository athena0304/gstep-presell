<template>
<div class="header-bar">
	<span class="back" @click='back'><i class="fa fa-angle-left" aria-hidden="true"></i></span>
	<slot></slot>
</div>
</template>
<script>
export default {
	methods: {
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="less" scoped>
.header-bar {
  font-size: 0.36rem;
  background-color: #ffb400;
  color: #fff;
  height: 0.96rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  line-height: 0.96rem;
}

.header-bar .back {
  float: left;
  font-size: 0.9rem;
}

.header-bar .title {
  text-align: center;
  line-height: 0.96rem;
}
</style>