<template>
  <div>
    <div class="welcome-message col-sm-12 mb-4">{{ customer.name + ' ' + customer.surname}}</div>
    <DataTable :value="entrances" v-model:expandedRows="expandedRows" scrollable>
      <template #header>
        <div class="flex flex-wrap justify-end gap-2">
          <Button text icon="pi pi-plus" label="Apri Tutto" @click="expandAll"></Button>
          <Button text icon="pi pi-minus" label="Chiudi Tutto" @click="collapseAll"></Button>
        </div>
      </template>
      <!-- TODO: Capire cosa mostrare  -->
      <Column expander></Column>
      <Column field="data_ingresso" header="Data Ingresso"></Column>
      <Column field="trattamento" header="Tipo Trattamento"></Column>
      <Column field="note" header="Note"></Column>
      <template #expansion="">
        <!-- TODO: Capire se ha davvero senso fare delle righe che si espandono -->
      </template>
    </DataTable>
  </div>
</template>
<script>
import axios from 'axios';
import Entrances from '@/JSON/Entrances.json';

export default {
  inject: ['classSelector', 'decryptTreatments'],
  data() {
    return {
      customer: JSON.parse(localStorage.getItem('customer')),
      entrances: Entrances.entrances,
      expandedRows: []
    }
  },
  methods: {
    getEntrances() {
      let user_data = JSON.parse(localStorage.getItem('user-data'));
      const config = {
        headers: { 'Authorization': `Bearer ${user_data.authToken}` }
      };
      let body = {"customer_id": this.customer.id};

      axios.post(window.BASE_URL_API_XANO + '/ingressi-customer', body, config)
      .then((response) => {
        let data = response.data;
        this.entrances = data;
        this.getTretments();
      }).catch((error) => {
        console.log(error);
      });
    },
    getTretments() {
      let user_data = JSON.parse(localStorage.getItem('user-data'));
      const config = {
        headers: { 'Authorization': `Bearer ${user_data.authToken}` }
      };

      axios.get(window.BASE_URL_API_XANO + '/treatments', config)
      .then((response) => {
        let data = response.data;
        Object.values(this.entrances).forEach((ingresso) => {
          ingresso.trattamento = this.decryptTreatments(data, ingresso.trattamento);
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    expandAll() {
      this.expandedRows = this.entrances;
    },
    collapseAll() {
      this.expandedRows = [];
    }
  },
  beforeMount() {
    this.getEntrances();
  },
  mounted() {
    this.classSelector();
  }
}
</script>