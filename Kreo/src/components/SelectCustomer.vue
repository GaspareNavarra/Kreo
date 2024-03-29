<template>
  <div id="dati-scheda-tecnica" class="dati-scheda-tecnica">
    <div class="row label-datasheet">Seleziona Cliente</div>
    <div class="row">
      <div class="inputBox col-sm-3 no-padding">
        <input id="searchname" type="text" required="required" v-model="searchname" ref="searchname" @keyup="searchName">
        <span>Nome</span>
        <div v-show="viewDropdown" class="col-sm-12 custom-dropdown-container">
          <div v-for="(customer, index) in filtredCustomerList" :key="index" class="custom-dropdown" @click="setCustomerData(customer)">{{ customer.name + ' ' + customer.surname }}</div>
        </div>
      </div>
      <div class="inputBox col-sm-3 no-padding">
        <input id="sheet-surname" type="text" required="required" v-model="surname" ref="surname">
        <span>Cognome</span>
      </div>
    </div>
    <div class="row">
      <div class="inputBox col-sm-3 no-padding">
        <input id="cellphone" type="text" required="required" v-model="cellphone" ref="cellphone">
        <span>Telefono</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    inject: ['classSelector', 'showLoader', 'hideLoader', 'linkTo'],
    data() {
      return {
        filtredCustomerList: [],
        filterLimit: 2,
        searchname: '',
        viewDropdown: false,
        surname: '',
        selectedCustomer: {},
        cellphone: '',
      }
    },
    methods: {
      alreadyExist(idCustomer) {
        for(let index in this.filtredCustomerList) {
          if(this.filtredCustomerList[index].id == idCustomer) {
            return true;
          }
        }
        return false;
      },
      removeCustomerFromFiltered(idCustomer) {
        let list = [];

        for(let customer in this.filtredCustomerList) {
          if(this.filtredCustomerList[customer].id != idCustomer) {
            list.push(this.filtredCustomerList[customer]);
          }
        }
        this.filtredCustomerList = list;
      },
      setCustomerData(customer) {
        this.searchname = customer.name;
        this.surname = customer.surname;
        this.cellphone = customer.numero_di_telefono;
        this.filtredCustomerList = [];
        this.viewDropdown = false;
        this.selectedCustomer = customer;
        console.log(customer);
      },
      searchName() {
        let searchnameLower = this.searchname.toLowerCase();
        if(searchnameLower.length >= this.filterLimit) {
          this.viewDropdown = true;
          for(let index in this.customerList) {
            if(this.customerList[index].name.toLowerCase().includes(searchnameLower) && !this.alreadyExist(this.customerList[index].id)) {
              this.filtredCustomerList.push(this.customerList[index]);
            } else if(!this.customerList[index].name.toLowerCase().includes(searchnameLower) && this.alreadyExist(this.customerList[index].id)) {
              this.removeCustomerFromFiltered(this.customerList[index].id);
              this.filtredCustomerList[index];
            }
          }
        } else {
          this.filtredCustomerList = [];
          this.viewDropdown = false;
        }
      },
    },
    watch: {
      searchname(newValue, oldValue) {
        if(newValue.length < oldValue.length) {
          this.surname = '';
        }
      }
    },
    mounted() {
      this.customerList = JSON.parse(window.localStorage.getItem('customerList'));
      this.classSelector();
    }
}
</script>
<style scoped>
.inputBox {
  margin-left: 5%;
  margin-right: 0;
}
.inputBox input {
  font-size: larger;
  text-transform: capitalize;
}
</style>