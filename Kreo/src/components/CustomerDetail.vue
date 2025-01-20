<template>
  <div>
    <div class="welcome-message col-sm-12 mb-4">{{ customer.name + ' ' + customer.surname}}</div>
    <div class="timeline-container">
      <Timeline :value="entrances">
        <template #marker>
          <i class="pi pi-check-circle" style="font-weight: bolder;"></i> <!-- style="color: #2bb163" -->
        </template>
        <template #content="slotProps">
          <Skeleton v-if="entrances?.entrances" height="10rem" class="card-spacer"></Skeleton>
          <Card class="card-spacer" v-if="entrances.length > 0">
            <template #title>{{ "Ingresso avvenuto il " + formatDate(slotProps.item.data_ingresso) }}</template>
            <template #subtitle><pre style="font-family: 'Poppins';">{{ 'Note: \n' + slotProps.item.note }}</pre></template>
            <template #content>
              <DataTable :value="slotProps.item.trattamento" showGridlines>
                <Column field="nome_trattamento" header="Trattamento">
                  <template #body v-if="entrances.length == 0">
                    <Skeleton></Skeleton>
                  </template>
                </Column>
                <Column field="tipo_trattamento" header="Tipo Trattamento">
                  <template #body v-if="entrances.length == 0">
                    <Skeleton></Skeleton>
                  </template>
                </Column>
                <Column field="azienda" header="Azienda">
                  <template #body v-if="entrances.length == 0">
                    <Skeleton></Skeleton>
                  </template>
                </Column>
                <Column field="prezzo" header="Prezzo">
                  <template #body v-if="entrances.length == 0">
                    <Skeleton></Skeleton>
                  </template>
                </Column>
              </DataTable>
            </template>
          </Card>
        </template>
      </Timeline>
    </div>
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
      entrances: Entrances,
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
        this.getTretments(data);
      }).catch((error) => {
        console.log(error);
      });
    },
    getTretments(ingressi) {
      let user_data = JSON.parse(localStorage.getItem('user-data'));
      const config = {
        headers: { 'Authorization': `Bearer ${user_data.authToken}` }
      };

      axios.get(window.BASE_URL_API_XANO + '/treatments', config)
      .then((response) => {
        let data = response.data;
        Object.values(ingressi).forEach((ingresso) => {
          ingresso.trattamento = this.decryptTreatments(data, ingresso.trattamento);
        });
        this.entrances = ingressi;
      }).catch((error) => {
        console.log(error);
      });
    },
    formatDate(date) {
      if(date == undefined || date == null) return '';
      let pieces = date.split('-');

      return pieces[2] + '/' + pieces[1] + '/' + pieces[0];
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