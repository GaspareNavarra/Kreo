<template>
  <div>
    
  </div>
</template>
<script>
export default {
  inject: ['classSelector'],
  data() {
    return {
      customer: JSON.parse(localStorage.getItem('customer'))
    }
  },
  mounted() {
    this.classSelector();
  }
}
</script>