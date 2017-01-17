<template>
	<div id="toast" v-show='show'>
	    <div class="weui-mask_transparent"></div>
	    <div class="weui-toast">
	        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
	        <p class="weui-toast__content">{{showMessage}}</p>
	    </div>
	</div>
</template>

<script>
export default {
  name: 'toast',
  props: ['message', 'show', 'callback'],
  computed: {
  	showMessage () {
  		return this.message || '已完成'
  	}
  },
  methods: {
  	
  },
  watch: {
    show (val) {
      val && setTimeout(() => {
        this.$emit('fadeOut')
        this.callback()
      }, 1000)
    }
  },
  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
</style>