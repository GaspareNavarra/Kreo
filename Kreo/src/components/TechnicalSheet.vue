<template>
  <div id="TechnicalSheet">
    <div id="container-info-entrance" class="col-sm-12 container-info-entrance">
      <div class="col-sm-12 col-10">
        <div class="row">
          <div class="welcome-message mb-4">Seleziona Trattamenti</div>
          <DataTable v-model:filters="filters" :globalFilterFields="['nome_trattamento', 'tipo_trattamento', 'azienda', 'prezzo']"  v-model:selection="selectedProduct" :value="treatments" :selectionMode="'multiple'" paginator removableSort :rows="4" tableStyle="min-width: 50rem">
            <template #header>
              <div class="flex justify-end">
                <IconField>
                  <InputIcon>
                    <i class="pi pi-search"></i>
                  </InputIcon>
                  <InputText v-model="filters['global'].value" placeholder="Cerca" />
                </IconField>
              </div>
            </template>
            <Column sortable field="nome_trattamento" header="Trattamento"></Column>
            <Column sortable field="tipo_trattamento" header="Tipo"></Column>
            <Column sortable field="azienda" header="Azienda"></Column>
            <Column sortable field="prezzo" header="Prezzo"></Column>
          </DataTable>
        </div>
        <div id="treatments-button" class="align-button-forward mt-2">
          <div id="add-treatments" class="add-treatments col-4 col-sm-2" @click="openAddTreatments()">Trattamento<i class="fa-solid fa-plus clear-data-icon"></i></div>
          <div id="clear" class="clear-data col-4 col-sm-2" @click="clearData()">Reset<i class="fa-solid fa-trash clear-data-icon"></i></div>
          <div id="forward" class="forward col-4 col-sm-2" @click="openSummaryPage(selectedProduct)">Riepilogo<i class="fa-solid fa-arrow-right forward-button"></i></div>
          <!-- <div id="forward" class="forward col-4 col-sm-2" @click="openPopUpSave(treatments, notes, prodotti)">Salva<i class="fa-solid fa-floppy-disk forward-button"></i></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {FilterMatchMode} from '@primevue/core/api';
import {product} from '@/JSON/Treatments.json';
import axios from 'axios';
export default {
  components: [DataTable, Column],
  inject: ['openPopUpSave', 'updateTreatments', 'showLoader', 'hideLoader', 'openAddTreatments', 'closeAddTreatments', 'setNewTreatments', 'openSummaryPage'],
  props: ['back_select_customer_check', 'new_treatments'],
  data() {
    return {
      treatments: product,
      selectedProduct: [],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nome_trattamento: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tipo_trattamento: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        azienda: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        prezzo: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
      }
    }
  },
  methods: {
    clearData() {
      this.selectedProduct = [];
      this.filters['global'].value = null;
    },
    getAllTreatments() {
      this.showLoader();
      let user_data = JSON.parse(localStorage.getItem('user-data'));
      const config = {
        headers: { 'Authorization': `Bearer ${user_data.authToken}` }
      };
      axios.get(window.BASE_URL_API_XANO + '/treatments', config).then((data) => {
        let response = data.data;
        this.treatments = response;
        this.hideLoader();
      }).catch((error) => {
        this.hideLoader();
        console.log(error);
      });
    }
  },
  watch: {
    back_select_customer_check(newValue) {
      if(newValue) this.updateTreatments(false);
    },
    new_treatments(newValue) {
      if(this.new_treatments.length > 0) {
        this.treatments = newValue;
        this.setNewTreatments({});

      }
    }
  },
  mounted() {
    this.getAllTreatments();
    this.updateTreatments(true);
  },
  beforeUnmount(){
    this.updateTreatments(false);
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
</style>