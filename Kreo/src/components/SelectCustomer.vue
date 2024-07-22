<template>
  <div id="dati-scheda-tecnica" class="dati-scheda-tecnica" @click="disableDropdown()">
    <div v-show="customerSelection">
      <div class="welcome-message mb-4">Dati del Cliente</div>
      <div class="row first-line inputLine">
        <div class="inputBox col-10 col-sm-3 no-padding">
          <input id="searchname" type="text" required="required" v-model="searchname" ref="searchname" @keyup="searchName">
          <span>Nome</span>
          <div v-show="filtredCustomerList.length == 0 ? false : viewDropdown" class="col-sm-12 col-12 custom-dropdown-container">
            <div v-for="(customer, index) in filtredCustomerList" :key="index" class="custom-dropdown" @click="setCustomerData(customer)">{{ customer.name + ' ' + customer.surname }}</div>
          </div>
        </div>
        <div class="inputBox col-10 col-sm-3 no-padding">
          <input id="sheet-surname" type="text" required="required" v-model="surname" ref="surname">
          <span>Cognome</span>
        </div>
        <div class="inputBox col-10 col-sm-3 no-padding">
          <input id="cellphone" type="text" required="required" v-model="cellphone" ref="cellphone" @keydown="checkChar()" maxlength="10">
          <span>Telefono</span>
        </div>
      </div>
      <div class="row second-row inputLine">
        <div class="inputBox col-10 col-sm-3 no-padding">
          <input id="email" type="text" required="required" v-model="email" ref="email">
          <span>E-mail</span>
        </div>
        <div class="inputBox col-10 col-sm-3 no-padding">
          <input id="birthday" class="birthday-customer" type="text" required="required" v-model="birthday" ref="birthday" @keydown="checkChar()" maxlength="10">
          <span>Data di nascita</span>
        </div>
        <div id="checkBox" class="col-sm-9 checkbox-container">
          <div class="align-gender-label-female">Donna</div>
          <input id="rememberme" type="checkbox" :checked="gender" @click="changeCheckboxState()">
          <div class="remember-label">Uomo</div>
        </div>
      </div>
      <div id="functionalities-container" class="row select-customer-container-button">
        <div id="clear-data" class="clear-data col-2 col-sm-1" @click="clearData()"><i class="fa-solid fa-trash clear-data-icon"></i></div>
        <div id="forward" class="forward col-3 col-sm-1" @click="forward()">Avanti<i class="fa-solid fa-circle-chevron-right forward-button"></i></div>
      </div>
    </div>
    <div v-show="!customerSelection">
      <TechnicalSheet></TechnicalSheet>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import TechnicalSheet from '@/components/TechnicalSheet.vue';
export default {
  components: {TechnicalSheet},
  inject: ['classSelector', 'showLoader', 'hideLoader', 'linkTo', 'capitalize', 'setBackSelectCustomerCheck', 'changePanelForCustomerSelection'],
  props:['back_select_customer_check'],
  data() {
    return {
      filtredCustomerList: [],
      filterLimit: 2,
      searchname: '',
      viewDropdown: false,
      surname: '',
      selectedCustomer: {},
      cellphone: '',
      email: '',
      birthday: '',
      gender: false,
      customerSelection: true
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
      this.email = customer.email;
      this.gender = customer.gender == 'D'? false : true;
      this.birthday = this.formatDateForText(customer.data_di_nascita);
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
    formatDateForText(data) {
      if(data == '') return '';
      let array_data = data.split('-');
      return array_data[2] + '/' + array_data[1] + '/' + array_data[0];
    },
    formatTextForDate(data) {
      if(data == '') return '';
      let array_data = data.split('/');
      return array_data[2] + '-' + array_data[1] + '-' + array_data[0];
    },
    clearData() {
      this.searchname = '';
      this.surname = '';
      this.cellphone = '';
      this.email = '';
      this.birthday = '';
      this.gender = false;

      this.$refs.searchname.classList.remove('input-error');
      this.$refs.surname.classList.remove('input-error');
      this.$refs.cellphone.classList.remove('input-error');
      this.$refs.email.classList.remove('input-error');
      this.$refs.birthday.classList.remove('input-error');
    },
    forward() {
      let customer = {};
      if(this.searchname != '' && this.surname != '' && this.cellphone != '' && this.email != '' && this.birthday != '' && this.email.includes('@')) {
        customer.name = this.capitalize(this.searchname);
        customer.surname = this.capitalize(this.surname);
        customer.cellphone = this.cellphone;
        customer.email = this.email.toLowerCase();
        customer.birthday = this.birthday;
        this.$refs.searchname.classList.remove('input-error');
        this.$refs.surname.classList.remove('input-error');
        this.$refs.cellphone.classList.remove('input-error');
        this.$refs.email.classList.remove('input-error');
        this.$refs.birthday.classList.remove('input-error');
        this.selectCustomer(customer);
      } else {
        if(this.searchname == '') {
          this.$refs.searchname.classList.add('input-error');
        }
        if(this.surname == '') {
          this.$refs.surname.classList.add('input-error');
        }
        if(this.cellphone == '') {
          this.$refs.cellphone.classList.add('input-error');
        }
        if(this.email == '' || !this.email.includes('@')) {
          this.$refs.email.classList.add('input-error');
        }
        if(this.birthday == '') {
          this.$refs.birthday.classList.add('input-error');
        }
      }
    },
    selectCustomer(customer) {
      this.showLoader();
      let user_data = JSON.parse(window.localStorage.getItem('user-data'));
      const config = {
        headers: { 'Authorization': `Bearer ${user_data.authToken}` }
      };

      axios.get(window.BASE_URL_API_CUSTOM + '/search-customer', config).then((data) => {
        let response = data.data;
        let result = this.searCustomer(response, customer);

        if(result) {
          this.customerSelection = false;
          this.changePanelForCustomerSelection(this.customerSelection);
          this.hideLoader();
        } else {
          this.addCustomer(customer);
        }
        console.log(response);
      }).catch((error) => {
        this.hideLoader();
        console.log(error);
      });
    },
    changeCheckboxState() {
      this.gender = !this.gender;
    },
    addCustomer(customer) {
      let customer_to_add = {};
      customer_to_add.name = customer.name;
      customer_to_add.surname = customer.surname;
      customer_to_add.data_di_nascita = this.formatTextForDate(customer.birthday);
      customer_to_add.email = customer.email;
      customer_to_add.numero_di_telefono = customer.cellphone;
      customer_to_add.gender = !this.gender? 'D' : 'U';
      axios.post(window.BASE_URL_API_XANO + '/customer', customer_to_add).then((data) => {
        if(data.status = 200) {
          this.customerSelection = false;
          this.changePanelForCustomerSelection(this.customerSelection);
        }
        this.hideLoader();
        console.log(response);
      }).catch((error) => {
        this.hideLoader();
        console.log(error);
      });
    },
    searCustomer(customerList, customer) {
      for(let singleCustomer in customerList) {
        if(customerList[singleCustomer].name == customer.name && customerList[singleCustomer].surname == customer.surname && customerList[singleCustomer].numero_di_telefono == customer.cellphone && customerList[singleCustomer].email == customer.email && this.formatDateForText(customerList[singleCustomer].data_di_nascita) == customer.birthday) {
          return true;
        }
      };
      return false;
    },
    disableDropdown() {
      this.viewDropdown = false;
    },
    checkChar() {
      if(event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 39) {
        if(event.keyCode < 48 || (event.keyCode >= 65 && event.keyCode <= 95) || event.keyCode > 105) {
          event.preventDefault();
        }
      }
    },
  },
  watch: {
    searchname(newValue, oldValue) {
      if(oldValue == '' && newValue != '')
        this.$refs.searchname.classList.remove('input-error');
    },
    surname(newValue, oldValue) {
      if(oldValue == '' && newValue != '')
        this.$refs.surname.classList.remove('input-error');
    },
    cellphone(newValue, oldValue) {
      if(oldValue == '' && newValue != '')
        this.$refs.cellphone.classList.remove('input-error');
    },
    email(newValue, oldValue) {
      if(oldValue == '' && newValue != '')
        this.$refs.email.classList.remove('input-error');
    },
    birthday(newValue, oldValue) {
      if(oldValue == '' && newValue != '') this.$refs.birthday.classList.remove('input-error');
      
      if((newValue.length > oldValue.length && newValue.length == 2) || (newValue.length > oldValue.length && newValue.length == 5)) {
        this.birthday += '/';
      } else if((newValue.length < oldValue.length && newValue.length == 3) || (newValue.length < oldValue.length && newValue.length == 6)) {
        this.birthday = this.birthday.slice(0, -1);
      }
    },
    back_select_customer_check(newValue) {
      if(newValue && !this.customerSelection) {
        this.customerSelection = true;
        this.changePanelForCustomerSelection(this.customerSelection);
      } else if(newValue && this.customerSelection) {
        this.linkTo('/HomePage');
      }

      if(newValue) this.setBackSelectCustomerCheck(false);
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
  margin-left: 1%;
  margin-right: 0;
}
.inputBox input {
  font-size: larger;
  text-transform: capitalize;
}
.checkbox-container {
    justify-content: start;
}
.welcome-message {
  padding-top: 0;
}
</style>