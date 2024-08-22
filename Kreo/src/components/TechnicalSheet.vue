<template>
  <div id="TechnicalSheet">
    <div id="container-info-entrance" class="col-sm-12 container-info-entrance">
      <div class="col-sm-12 col-10">
        <div class="row">
          <DataTable v-model:selection="selectedProduct" :value="treatments" :selectionMode="'multiple'" paginator removableSort :rows="6" tableStyle="min-width: 50rem">
            <Column sortable field="nome_trattamento" header="Trattamento"></Column>
            <Column sortable field="tipo_trattamento" header="Tipo"></Column>
            <Column sortable field="Azienda" header="Azienda"></Column>
            <Column sortable field="Prezzo" header="Prezzo"></Column>
          </DataTable>
        </div>
        <div id="treatments-button" class="align-button-forward">
          <div id="clear" class="clear-data col-4 col-sm-2" @click="clearData()">Annulla<i class="fa-solid fa-trash clear-data-icon"></i></div>
          <div id="forward" class="forward col-4 col-sm-2" @click="openPopUpSave(treatments, notes, prodotti, price)">Salva<i class="fa-solid fa-floppy-disk forward-button"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Treatments from '../JSON/Treatments.json';
export default {
  components: [DataTable, Column],
  inject: ['openPopUpSave', 'setTechnicalsheetError'],
  props: ['technicalsheetError'],
  data() {
    return {
      treatments: Treatments.product,
      selectedProduct: [],
    }
  },
  methods: {
    clearData() {
      this.selectedProduct = [];
    }
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
.clear-data-icon {
  padding-left: 5px;
}
.p-datatable-row-selected {
  background-color: blueviolet!important;
}
</style>