<template>
  <div id="Customer">
    <div class="welcome-message col-sm-12">Gestione Clienti</div>
    <div class="col-sm-12 searchbar-container">
      <div class="col-sm-3 align-searchbar-customer">
        <input class="form-control mr-sm-2 input-customer" type="search" v-model="searchname" placeholder="Cerca" aria-label="Cerca" @keyup="searchName">
      </div>
    </div>
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
          <tr v-for="(customer, index) in customerListToDisplay" :key="index"  class="text-center">
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
              <button id="open-customer-information" class="col-sm-3 btn btn-primary" style="margin-left: 5px;" @click="openCustomerDetail(customer)">
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
  props: ['empty_subject', 'empty_mail_text'],
  data() {
    return {
      customerList: JSON.parse(window.localStorage.getItem('customerList')),
      customerListToDisplay: JSON.parse(window.localStorage.getItem('customerList')),
      searchname: '',
      filterLimit: 2,
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
    },
    searchName() {
      let searchnameLower = this.searchname.toLowerCase();
      if(searchnameLower.length >= this.filterLimit) {
        this.viewDropdown = true;
        for(let index in this.customerList) {
          if((this.customerList[index].name.toLowerCase().includes(searchnameLower) ||
          this.customerList[index].surname.toLowerCase().includes(searchnameLower) ||
          this.customerList[index].email.toLowerCase().includes(searchnameLower) ||
          this.formatData(this.customerList[index].data_di_nascita).toLowerCase().includes(searchnameLower)) && !this.alreadyExist(this.customerList[index].id)) {
            this.customerListToDisplay.push(this.customerList[index]);
          } else if(!(this.customerList[index].name.toLowerCase().includes(searchnameLower) ||
            this.customerList[index].surname.toLowerCase().includes(searchnameLower) ||
            this.customerList[index].email.toLowerCase().includes(searchnameLower) ||
            this.formatData(this.customerList[index].data_di_nascita).toLowerCase().includes(searchnameLower)) && this.alreadyExist(this.customerList[index].id)) {
            this.removeCustomerFromFiltered(this.customerList[index].id);
            this.customerListToDisplay[index];
          }
        }
      } else {
        this.customerListToDisplay = this.customerList;
        this.viewDropdown = false;
      }
    },
    removeCustomerFromFiltered(idCustomer) {
      let list = [];

      for(let customer in this.customerListToDisplay) {
        if(this.customerListToDisplay[customer].id != idCustomer) {
          list.push(this.customerListToDisplay[customer]);
        }
      }
      this.customerListToDisplay = list;
    },
    alreadyExist(idCustomer) {
      for(let index in this.customerListToDisplay) {
        if(this.customerListToDisplay[index].id == idCustomer) {
          return true;
        }
      }
      return false;
    },
    openCustomerDetail(customer) {
      window.localStorage.setItem('customer', JSON.stringify(customer));
      this.linkTo('/CustomerDetail');
    }
  },
  watch: {
    searchname(newValue, oldValue) {
      if(oldValue.length > 1 && newValue.length == 0) this.customerListToDisplay = this.customerList;
    }
  },
  mounted() {
    this.classSelector();
    this.getCustomers();
    window.localStorage.removeItem('customer');
    console.log(this.customerList);
  }
}
</script>
<style scoped>
.welcome-message {
  margin-bottom: 5%;
}
</style>