<template>
  <div id="BirthdayList">
    <div class="welcome-message col-sm-12">Gestione Clienti</div>
    <div class="table-container table-responsive table-size">
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <!-- <th scope="col">#</th> -->
            <th scope="col">Nome e Cognome</th>
            <th scope="col">Data di Nascita</th>
            <th scope="col">Email</th>
            <th scope="col">Azioni</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(customer, index) in customerList" :key="index"  class="text-center">
            <!-- <th scope="row">{{ index + 1 }}</th> -->
            <td class="content-aligned">{{ customer.name + ' ' + customer.surname }}</td>
            <td class="content-aligned">{{ formatData(customer.data_di_nascita) }}</td>
            <td class="content-aligned">{{ customer.email }}</td>
            <td class="content-aligned">
              <button id="birthday-signal" class="col-sm-3 customer-button btn" :class="{'birthdayChecked btn-warning': customer.compleanno, 'btn-secondary': !customer.compleanno}">
                <i class="fa-solid fa-cake-candles labelBirthdayChecked"  :class="{'labelBirthdayChecked': customer.compleanno}"></i>
              </button>
              <button id="send-mail" class="col-sm-3 customer-button btn btn-success" style="margin-left: 5px;">
                <i class="fa-regular fa-envelope labelBirthdayChecked"></i>
              </button>
              <button id="open-customer-information" class="col-sm-3 customer-button btn btn-primary" style="margin-left: 5px;">
                <i class="fa-solid fa-arrow-up-right-from-square labelBirthdayChecked"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
export default {
  inject: ['classSelector', 'getCustomers'],
  data() {
    return {
      customerList: JSON.parse(window.localStorage.getItem('customerList'))
    }
  },
  methods: {
    formatData(data) {
      let formattedData = data.split('-');
      return formattedData[2] + '/' + formattedData[1] + '/' + formattedData[0];
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
</style>