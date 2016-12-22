<template>

<div>
{{purchaseDetail}}
<a class="order-footer order-detail-footer">
    确定
  </a>
</div>
  

</template>

<script>
export default {
  name: 'PurchasePanel',
  props: ['purchaseDetail'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // lalala: this.purchaseDetail
    }
  }
}
</script>