<template>
  <div id="SummaryPage">
    <div class="summary-container row no-margin col-sm-12">
      <div class="summary-box col-sm-5 mt-4 mb-4">
        <Card  style="width: 100%; overflow: hidden; margin-bottom: 2vh;" :style="visibleCustomerData? 'max-height: 27vh;' : 'max-height: 49vh;'">
          <template #title>Trattamenti</template>
          <template #subtitle>{{ (selectedTreatments.length >= 10) ? 'Scrolla la lista per vedere tutti itrattamenti' : ''}}</template>
          <template #content>
            <div style="overflow-y: auto;" :style="!visibleCustomerData? 'max-height: 33vh;' : 'max-height: 11vh;'">
              <p class="m-0" v-for="(treatment, index) in selectedTreatments" :key="index">
                {{treatment.nome_trattamento + ': ' + treatment.prezzo}}
              </p>
            </div>
          </template>
        </Card>
        <Card  style="width: 100%; overflow: hidden;" :style="!visibleCustomerData? 'max-height: 14vh;' : 'max-height: 240px;'" @click="toggle()">
          <template #title>Dati del cliente</template>
          <template #subtitle>{{ visibleCustomerData? 'Clicca per nascondere i dati' : 'Clicca per visualizzare i dati'}}</template>
          <template #content v-if="visibleCustomerData">
            <div class="align-card-text">
              <p class="spacer-label-card">Nome:</p>
              <p class="m-0">
                {{selectedCustomer.name}}
              </p>
            </div>
            <div class="align-card-text">
              <p class="spacer-label-card">Cognome:</p>
              <p class="m-0">
                {{selectedCustomer.surname}}
              </p>
            </div>
            <div class="align-card-text">
              <p class="spacer-label-card">Data di nascita:</p>
              <p class="m-0">
                {{selectedCustomer.data_di_nascita}}
              </p>
            </div>
            <div class="align-card-text">
              <p class="spacer-label-card">Telefono:</p>
              <p class="m-0">
                {{selectedCustomer.numero_di_telefono}}
              </p>
            </div>
            <div class="align-card-text">
              <p class="spacer-label-card">E-mail:</p>
              <p class="m-0">
                {{selectedCustomer.email}}
              </p>
            </div>
          </template>
        </Card>
      </div>
      <!-- <div class="spacer col-sm-1 no-padding">
        <div class="vertical-line mt-4 mb-4"></div>
      </div> -->
      <div class="col-sm-5 mt-4 mb-4">
        <Card  style="width: 100%; overflow: hidden;">
          <template #title>Note</template>
          <template #subtitle>Se hai da aggiungere delle note scrivile qui</template>
          <template #content>
            <textarea class="textarea-notes" name="notes" id="Notes" v-model="note" placeholder="Scrivi qui qualunque cosa possa servirti in futuro come dettagli sui trattamenti o i prodotti comprati dal cliente"></textarea>
          </template>
        </Card>
      </div>
      <div class="align-button">
        <div id="clear" class="clear-data col-4 col-sm-2" @click="openDeleteProcessPopUp()">Annulla<i class="fa-solid fa-trash clear-data-icon"></i></div>
        <div id="forward" class="forward col-4 col-sm-2" @click="openPopUpSave(note)">Salva<i class="fa-solid fa-floppy-disk forward-button"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['classSelector', 'openDeleteProcessPopUp', 'openPopUpSave'],
  props: ['selectedTreatments'],
  data() {
    return {
      selectedCustomer: {},
      visibleCustomerData: false,
      note: ''
    }
  },
  methods: {
    toggle() {
      this.visibleCustomerData = !this.visibleCustomerData;
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
  height: 67vh;
  width: 5px;
  padding-left: 0;
  padding-right: 0;
  border-radius: 5px;
}
.spacer {
  display: flex;
  justify-content: center;
  /* width: 5px; */
}
.clear-data-icon {
  padding-left: 5px;
}
</style>