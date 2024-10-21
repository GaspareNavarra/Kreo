<template>
  <div id="SummaryPage">
    <div class="summary-container row no-margin col-sm-12">
      <div class="summary-box col-sm-5 mt-4 mb-4">
        <Card  style="width: 25rem; overflow: hidden">{{selectedCustomer}}</Card>
      </div>
      <div class="spacer col-sm-1 no-padding">
        <div class="vertical-line mt-4 mb-4"></div>
      </div>
      <div class="col-sm-5 mt-4 mb-4">bho</div>
    </div>
  </div>
</template>
<script>
import Card from 'primevue/card';
export default {
  inject: ['classSelector'],
  props: ['selectedTreatments'],
  components: [ Card ],
  data() {
    return {
      selectedCustomer: {}
    }
  },
  mounted() {
    this.classSelector();
    this.selectedCustomer = JSON.parse(localStorage.getItem('customer'));
  }
}
</script>
<style scoped>
.vertical-line {
  background-color: black;
  height: 450px;
  width: 10px;
  padding-left: 0;
  padding-right: 0;
  border-radius: 20px;
}
.spacer {
  display: flex;
  justify-content: center;
}
</style>