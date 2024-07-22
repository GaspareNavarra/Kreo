<template>
  <div>
    <div id="container-info-entrance" class="row col-sm-12 container-info-entrance">
      <div class="col-sm-9 col-10">
        <div class="welcome-message col-sm-12 col-12">Trattamenti</div>
        <div class="row container-data">
          <textarea class="col-sm-12 treatments-notes" placeholder="Descrivi il trattamento" v-model="treatments"></textarea>
          <div id="treatments-button" class="align-button-forward">
            <div id="forward" class="forward col-4 col-sm-2" @click="forward()">Avanti<i class="fa-solid fa-circle-chevron-right forward-button"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      treatments: ''
    }
  },
  methods: {
    forward() {
      
    }
  }
}
</script>
<style scoped>
.welcome-message {
  padding: 0!important;
  font-size: xx-large;
  margin-bottom: 10px;
}
.forward {
  padding-left: 20px!important;
}
</style>