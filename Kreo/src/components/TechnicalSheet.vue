<template>
  <div id="TechnicalSheet">
    <div id="container-info-entrance" class="col-sm-12 container-info-entrance">
      <div class="col-sm-12 col-10">
        <div class="row">
          <div class="welcome-message col-sm-6 col-12">Prodotti Acquistati</div>
          <div class="welcome-message col-sm-6 col-12">Note</div>
        </div>
        <div class="container-data">
          <textarea class="col-sm-6 note-ingresso" placeholder="Scrivi i prodotti acquistati" v-model="prodotti" style="margin-right: 10px;"></textarea>
          <textarea class="col-sm-6 note-ingresso" placeholder="Scrivi note aggiuntive" v-model="notes"></textarea>
        </div>
        <div class="welcome-message col-sm-12 col-12">Trattamenti</div>
        <div class="row container-data">
          <textarea class="col-sm-6 note-ingresso treatments-notes" placeholder="Descrivi il trattamento" v-model="treatments"></textarea>
          <div class="inputBox col-10 col-sm-3 no-padding inputPrice">
            <input id="Prezzo" type="text" required="required" v-model="price" ref="price" @keydown="checkChar()">
            <span>Prezzo</span>
            <p>€</p>
          </div>
        </div>
        
        <div id="treatments-button" class="align-button-forward">
          <div id="forward" class="forward col-4 col-sm-2" @click="openPopUpSave(treatments, notes, prodotti, price)">Salva<i class="fa-solid fa-floppy-disk forward-button"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['openPopUpSave', 'setTechnicalsheetError'],
  props: ['technicalsheetError'],
  data() {
    return {
      treatments: '',
      notes: '',
      prodotti: '',
      price: ''
    }
  },
  methods: {
    checkChar() {
      if(event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 39 && event.keyCode != 188) {
        if(event.keyCode < 48 || (event.keyCode >= 65 && event.keyCode <= 95) || event.keyCode > 105) {
          event.preventDefault();
        }
      }
    },
  },
  watch: {
    technicalsheetError(newValue) {
      if(newValue) {
        this.setTechnicalsheetError(false);
        this.$refs.price.classList.add('input-error');
      }
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