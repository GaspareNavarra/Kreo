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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(customer, index) in customerList" :key="index">
            <!-- <th scope="row">{{ index + 1 }}</th> -->
            <td>{{ customer.name + ' ' + customer.surname }}</td>
            <td>{{ formatData(customer.data_di_nascita) }}</td>
            <td>{{ customer.email }}</td>
            <td>
              <button></button>
              <button></button>
              <button></button>
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