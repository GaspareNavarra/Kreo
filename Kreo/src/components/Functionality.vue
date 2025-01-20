<template>
  <div id="function" class="col-sm-12 col-12">
    <div class="welcome-message col-sm-12">{{ getUserName() }}</div>
    <div class="container-funzioni">
      <div class="container-piastre row no-margin no-padding">
        <div class="piastra col-5 col-sm-2" @click="selectFunction('Aggiungi Scheda')">
          <div class="align-content-piastra col-12 col-sm-12">
            <i class="fa-regular fa-file-circle-plus icona-piastra col-12 col-sm-12"></i>
            <div class="piastra-label text-truncate">Aggiungi Scheda</div>
          </div>
        </div>
        <div class="piastra col-5 col-sm-2" @click="selectFunction('Gestisci Clienti')">
          <div class="align-content-piastra col-12 col-sm-12">
            <i class="fa-solid fa-user icona-piastra col-12 col-sm-12"></i>
            <div class="piastra-label text-truncate">Gestisci Clienti</div>
          </div>
        </div>
        <!-- TODO: Rimuovere lo style per quando sarà implementata la pagina -->
        <div class="piastra col-5 col-sm-2 piastra-disabled">
          <i class="pi pi-lock style-pi-lock"></i>
          <div class="align-content-piastra col-12 col-sm-12">
            <i class="fa-solid fa-gear icona-piastra col-12 col-sm-12" style="color:#404144;"></i>
            <div class="piastra-label text-truncate" style="color:#404144;">Impostazioni</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['classSelector', 'linkTo'],
  props: ['empty_subject', 'empty_mail_text'],
  methods: {
    selectFunction(functionality) {
      switch (functionality) {
        case 'Aggiungi Scheda':
          this.linkTo('/SelectCustomer');
          break;
        case 'Gestisci Clienti':
          this.linkTo('/Customer');
          break;
        case 'Impostazioni':
          this.linkTo('/');
          break;
      }
    },
    getUserName() {
      let name = JSON.parse(localStorage.getItem('user-data')).user.name;

      return 'Benvenuta ' + name;
    },
  },
  mounted() {
    this.classSelector();
  }
}
</script>