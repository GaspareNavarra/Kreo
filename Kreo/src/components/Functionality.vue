<template>
  <div id="function">
    <div class="welcome-message col-sm-12">{{ getUserName() }}</div>
    <div class="container-funzioni">
      <div class="container-piastre">
        <div class="piastra col-sm-3" @click="selectFunction('Aggiungi Scheda')">
          <i class="fa-regular fa-file-circle-plus icona-piastra"></i>
          <span class="piastra-label">Aggiungi Scheda</span>
        </div>
        <div class="piastra col-sm-3" @click="selectFunction('Cerca Scheda/Ingressi')">
          <i class="fa-solid fa-magnifying-glass icona-piastra"></i>
          <span class="piastra-label">Cerca Scheda/Ingressi</span>
        </div>
        <div class="piastra col-sm-3" @click="selectFunction('Modifica Dati di Accesso')">
          <i class="fa-solid fa-gear icona-piastra"></i>
          <span class="piastra-label">Modifica Dati di Accesso</span>
        </div>
      </div>
      <!-- <div class="container-piastre">
                <div class="piastra col-sm-4" @click="selectFunction('Modifica Dati di Accesso')">
                    <i class="fa-solid fa-gear icona-piastra"></i>
                    <span class="piastra-label">Modifica Dati di Accesso</span>
                </div>
                <div class="piastra col-sm-4" @click="selectFunction('Aggiungi Utente')">
                    <i class="fa-regular fa-user-plus icona-piastra"></i>
                    <span class="piastra-label">Aggiungi Utente</span>
                </div>
            </div> -->
    </div>
  </div>
</template>

<script>
export default {
  inject: ['classSelector', 'linkTo'],
  methods: {
    selectFunction(functionality) {
      switch (functionality) {
        case 'Aggiungi Scheda':
          this.linkTo('/SelectCustomer');
          break;
        case 'Cerca Scheda/Ingressi':
          this.linkTo('/');
          break;
        case 'Modifica Dati di Accesso':
          this.linkTo('/');
          break;
        // case 'Aggiungi Utente':
        //     this.linkTo('/AddUser');
        //     break;
      }
    },
    getUserName() {
      let name = JSON.parse(window.localStorage.getItem('user-data')).name;

      return 'Benvenuta ' + name;
    },
  },
  mounted() {
    this.classSelector();
  }
}
</script>