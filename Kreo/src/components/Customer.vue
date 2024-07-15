<template>
  <div id="BirthdayList">
    <div class="welcome-message col-sm-12">Gestione Clienti</div>
    <div class="table-size">
      <table class="table table-hover">
        <thead class="table-dark">
          <tr class="text-center">
            <!-- <th scope="col">#</th> -->
            <th scope="col">Nome e Cognome</th>
            <th scope="col">Data di Nascita</th>
            <th scope="col">Email</th>
            <th scope="col">Compleanno | E-Mail | Seleziona</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(customer, index) in customerList" :key="index"  class="text-center">
            <!-- <th scope="row">{{ index + 1 }}</th> -->
            <td class="content-aligned">{{ customer.name + ' ' + customer.surname }}</td>
            <td class="content-aligned">{{ formatData(customer.data_di_nascita) }}</td>
            <td class="content-aligned">{{ customer.email }}</td>
            <td class="content-aligned">
              <button id="birthday-signal" class="col-sm-3 btn" :class="{'birthdayChecked btn-warning': customer.compleanno, 'btn-outline-warning birthdayUnchecked': !customer.compleanno}">
                <i class="fa-solid fa-cake-candles" :class="{'whiteLabels': customer.compleanno}"></i>
              </button>
              <button id="send-mail" class="col-sm-3 btn btn-success" style="margin-left: 5px;" @click="goToMailPage(customer)">
                <i class="fa-regular fa-envelope whiteLabels"></i>
              </button>
              <button id="open-customer-information" class="col-sm-3 btn btn-primary" style="margin-left: 5px;">
                <i class="fa-solid fa-arrow-up-right-from-square whiteLabels"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="ArrowDown" class="arrow-down">
      <i class="fa-solid fa-chevron-down"></i>
    </div>

  </div>
</template>
<script>
export default {
  inject: ['classSelector', 'getCustomers', 'linkTo'],
  data() {
    return {
      customerList: JSON.parse(window.localStorage.getItem('customerList'))
    }
  },
  methods: {
    formatData(data) {
      let formattedData = data.split('-');
      return formattedData[2] + '/' + formattedData[1] + '/' + formattedData[0];
    },
    goToMailPage(customer) {
      window.localStorage.setItem('customer', JSON.stringify(customer));
      this.linkTo('/BirthDay');
    }
  },
  mounted() {
    this.classSelector();
    this.getCustomers();
    console.log(this.customerList);
  }
}
</script>
<style scoped>
.welcome-message {
  margin-bottom: 6%;
}
.btn-success {
  background-color: #212529;
  border-color: #212529;

  /* #198754 verde chiaro
  #157347 verde scuro */
}
.btn-success:hover {
  background-color: black;
  border-color: black;
}
</style>