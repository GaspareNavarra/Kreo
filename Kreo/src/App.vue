<template>
  <div id="MainBody">
    <div v-show="loader" class="shadow-container">
      <div class="center-loader">
        <div class="loader-text">Loading...</div>
        <div class="ring"></div>
      </div>
    </div>

    <div id="emailPopUp" v-show="popup_email" class="shadow-container row no-margin">
      <div class="datasheet_size popup-message col-sm-5 col-11">
        <div id="description" class="popup-description">
          <div id="paper-plane-icon" class="paper-plane-icon col-sm-12">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
          <span class="col-sm-12">Vuoi inviare la mail?</span>
        </div>
        <div id="buttonContainer" class="email-popup-button col-sm-12">
          <button class="btn btn-success col-sm-3 col-4 back-popup-button" @click="closePopUpEmail()">Annulla</button>
          <button class="btn btn-success col-sm-3 col-4" @click="sendMail()">Conferma</button>
        </div>
      </div>
    </div>

    <div id="savePopUp" v-show="popup_save" class="shadow-container row no-margin">
      <div class="datasheet_size popup-message col-sm-5 col-11">
        <div id="description" class="popup-description">
          <div id="paper-plane-icon" class="paper-plane-icon col-sm-12">
            <i class="fa-solid fa-floppy-disk"></i>
          </div>
          <span class="col-sm-12">Vuoi salvare le modifiche?</span>
        </div>
        <div id="buttonContainer" class="email-popup-button col-sm-12">
          <button class="btn btn-success col-sm-3 col-4 back-popup-button" @click="closePopUpSave()">Annulla</button>
          <button class="btn btn-success col-sm-3 col-4" @click="saveEntrance()">Conferma</button>
        </div>
      </div>
    </div>

    <div id="savePopUp" v-show="affermativeModal || negativeModal" class="shadow-container row no-margin">
      <div class="datasheet_size popup-message col-sm-5 col-11">
        <div id="description" class="popup-description">
          <div id="paper-plane-icon" class="paper-plane-icon col-sm-12">
            <i :class="{'fa-regular fa-circle-xmark': negativeModal, 'fa-regular fa-circle-check': affermativeModal}"></i>
          </div>
          <span class="col-sm-12">{{ messageView }}</span>
        </div>
        <div id="buttonContainer" class="email-popup-button col-sm-12">
          <button class="btn btn-success col-sm-3 col-4" @click="closeMessageModal()">Conferma</button>
        </div>
      </div>
    </div>

    <div id="navbar" class="custom-navbar row col-sm-12 col-12">
      <div class="col-sm-2 col-2">
        <i v-show="back" class="fa-regular fa-arrow-left back-arrow" @click="goBack(true)"></i>
      </div>
      <img src="/Img/LogoNew.png" class="logo_size" @click="linkTo('/HomePage')">
      <div class="col-sm-2  col-2 container-logout">
        <div v-show="userState" id="logoutButton" class="logout-button col-8 col-sm-8" @click="doLogout()">
          <i class="fa-solid fa-power-off logout-icon"></i>
          <span style="color: #fff;">Logout</span>
        </div>
      </div>
    </div>

    <!-- <BirthDay v-show="userState" :customerList="customerList" :userState="userState"></BirthDay> -->
    
    <div id="scheda-tecnica" class="datasheet_size" ref="scheda_tecnica"
    :class="{
      'login-size_pannel col-9 col-sm-5': loginPage,
      'Homepage col-11 col-sm-9 mt-4 mt-sm-5': homePage,
      'not-found': notFound,
      'selectCustomerPage col-sm-10 col-10': selectCustomerPage,
      'Customer col-11 col-sm-9 mt-4 mt-sm-5': customer,
      'Birthday col-sm-4 col-10 mt-4 mt-sm-4': birthday,
      'col-11 col-sm-9 mt-4 mt-sm-5': customerDetail
    }">
      <router-view
      :empty_subject="empty_subject"
      :empty_mail_text="empty_mail_text"
      :back_select_customer_check="back_select_customer_check"
      :clearCustomerSelected="clearCustomerSelected"></router-view>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
// import BirthDay from '@/components/BirthDay.vue';

export default {
  // components: { BirthDay },
  provide() {
    return {
      classSelector: this.classSelector,
      Login: this.Login,
      linkTo: this.linkTo,
      showLoader: this.showLoader,
      hideLoader: this.hideLoader,
      displayBack: this.displayBack,
      showMessageModal: this.showMessageModal,
      getCustomers: this.getCustomers,
      capitalize: this.capitalize,
      openPopUpEmail: this.openPopUpEmail,
      resetMailError: this.resetMailError,
      setBackSelectCustomerCheck: this.setBackSelectCustomerCheck,
      openPopUpSave: this.openPopUpSave,
      setClearCustomerSelected: this.setClearCustomerSelected,
      setTechnicalsheetError: this.setTechnicalsheetError
    }
  },
  data() {
    return {
      userState: false,
      loginPage: true,
      homePage: false,
      selectCustomerPage: false,
      notFound: false,
      loader: false,
      back: false,
      customer: false,
      birthday: false,
      customerList: [],
      popup_email: false,
      email: {},
      empty_subject: false,
      empty_mail_text: false,
      back_select_customer_check: false,
      popup_save: false,
      treatments: '',
      notes: '',
      prodotti: '',
      clearCustomerSelected: false,
      customerDetail: false,
      messageView: '',
      affermativeModal: false,
      negativeModal: false,
      prezzo: 0,
      technicalsheetError: false
    }
  },
  methods: {
    classSelector(notFound) {
      let url = window.location.href;

      this.customer = false;
      this.selectCustomerPage = false;
      this.notFound = false;
      this.homePage = false;
      this.loginPage = false;
      this.birthday = false;
      this.customerDetail = false;

      if(notFound == 1) {
        this.notFound = true;
      } else if(url.includes('/Login')) {
        this.loginPage = true;
      } else if(url.includes('/HomePage')){
        this.homePage = true
      } else if(url.includes('/SelectCustomer')){
        this.selectCustomerPage = true;
      } else if(url.includes('/CustomerDetail')) {
        this.customerDetail = true;
      } else if(url.includes('/BirthDay')) {
        this.birthday = true;
      } else if(url.includes('/Customer')) {
        this.customer = true;
      }

      if(!url.includes('/Login') && !url.includes('/HomePage'))
        this.back = true;
      else
        this.back = false;
    },
    Login() {
      this.userState = true;
      window.localStorage.setItem('isAuth', this.userState);
      this.linkTo('/HomePage');
    },
    linkTo(page) {
      this.$router.push(page);
    },
    doLogout() {
      this.showLoader();
      this.userState = false;
      window.localStorage.setItem('isAuth', this.userState);
      window.localStorage.removeItem('user-data');
      this.linkTo('/');
      this.hideLoader();
    },
    showLoader() {
      this.loader = true;
    },
    hideLoader() {
      this.loader = false;
    },
    displayBack() {
      let url = window.location.href;
      
      if(url.includes('/Login'))
        this.back = false;
      else
        this.back = true;
    },
    goBack(arrow) {
      let url = window.location.href;

      if(url.includes('/BirthDay')) {
        this.linkTo('/Customer');
      } else if(url.includes('/SelectCustomer') && arrow) {
        this.back_select_customer_check = true;
      } else if(!arrow && url.includes('/SelectCustomer')) {
        this.back_select_customer_check = true;
        this.clearCustomerSelected = true;
      } else if(url.includes('/CustomerDetail')) {
        this.linkTo('/Customer');
      } else {
        this.linkTo('/HomePage');
      }

    },
    showMessageModal() {
      this.notFound = true;
      this.homePage = false;
      this.loginPage = false;
      this.back = false;
    },
    getCustomers() {
      this.showLoader();
      let user_data = JSON.parse(window.localStorage.getItem('user-data'));
      const config = {
        headers: { 'Authorization': `Bearer ${user_data.authToken}` }
      };
      axios.get(window.BASE_URL_API_XANO + '/customer', config).then((data) => {
        let response = data.data;
        this.customerList = response.sort((customer_one, customer_two) => {
          customer_one.compleanno = false;
          customer_two.compleanno = false;
          let customer_birthday_one = customer_one.data_di_nascita.split('-');
          let customer_birthday_two = customer_two.data_di_nascita.split('-');
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

          if((customer_birthday_one[2] == dd && customer_birthday_one[1] == mm) && !(customer_birthday_two[2] == dd && customer_birthday_two[1] == mm)) {
            customer_one.compleanno = true;
            return -1;
          } else if((customer_birthday_two[2] == dd && customer_birthday_two[1] == mm) && !(customer_birthday_one[2] == dd && customer_birthday_one[1] == mm)) {
            customer_two.compleanno = true;
            return 1;
          } else if((customer_birthday_one[2] == dd && customer_birthday_one[1] == mm) && (customer_birthday_two[2] == dd && customer_birthday_two[1] == mm)) {
            customer_one.compleanno = true;
            customer_two.compleanno = true;
            return 0;
          } else {
            customer_one.compleanno = false;
            customer_two.compleanno = false;
            return 0;
          }
        });
        window.localStorage.setItem('customerList', JSON.stringify(this.customerList));
        this.hideLoader();
      }).catch((error) => {
        this.hideLoader();
        console.log(error);
      });
    },
    capitalize(string) {
      return string.replace(/\b\w/g, (char) => {
        return char.toUpperCase();
      });
    },
    openPopUpEmail(mail) {
      this.email = mail;
      this.popup_email = true;
    },
    closePopUpEmail() {
      this.popup_email = false;
    },
    sendMail() {
      this.closePopUpEmail();
      this.showLoader();
      if(this.checkMailParameter()) {
        let user_data = JSON.parse(window.localStorage.getItem('user-data'));
        const config = {
          headers: { 'Authorization': `Bearer ${user_data.authToken}` }
        };
        axios.post(window.BASE_URL_API_CUSTOM + '/send-mail', this.email, config)
        .then((response) => {
          this.email = {};
          this.goBack();
          this.hideLoader();
          console.log(response);
        }).catch((error) => {
          this.email = {};
          this.hideLoader();
          console.log(error);
        });
      } else {
        this.hideLoader();
      }
    },
    checkMailParameter() {
      let error = false;
      if(this.email.subject == undefined || this.email.subject == '' || this.email.subject == null) {
        this.empty_subject = true;
        error = true;
      }
      if(this.email.text == undefined || this.email.text == '' || this.email.text == null) {
        this.empty_mail_text = true;
        error = true;
      }

      if(!error) return true;
      else return false;
    },
    resetMailError(value) {
      if(value == 'error_subject') this.empty_subject = false;
      if(value == 'error_mail_text') this.empty_mail_text = false;
    },
    checkUserState() {
      let user = window.localStorage.getItem('user-data');
      let url = window.location.href.split('/')[window.location.href.split('/').length - 1];

      if(user != null && url != 'login' && url != '') {
        this.userState = true;
        window.localStorage.setItem('isAuth', this.userState);
        this.linkTo('/' + url);
      } else {
        window.localStorage.removeItem('user-data');
        this.userState = false;
        window.localStorage.setItem('isAuth', this.userState);
        this.linkTo('/');
      }
    },
    setBackSelectCustomerCheck(value) {
      this.back_select_customer_check = value;
    },
    saveEntrance() {
      this.popup_save = false;
      this.showLoader();
      // {
      //   "customer_id": 0,
      //   "prodotti_comprati": "\"\"",
      //   "trattamento": "\"\"",
      //   "note": "\"\"",
      //   "data_ingresso": ""
      // }
      let user_data = JSON.parse(window.localStorage.getItem('user-data'));
      const config = {
        headers: { 'Authorization': `Bearer ${user_data.authToken}` }
      };

      let customer = JSON.parse(window.localStorage.getItem('customer'));
      let ingresso = {};
      ingresso.customer_id = customer.id;
      ingresso.trattamento = this.treatments;
      ingresso.note = this.notes;
      ingresso.prodotti_comprati = this.prodotti == ''? 'Nessun prodotto' : this.prodotti;
      ingresso.data_ingresso = new Date;

      axios.post(window.BASE_URL_API_XANO + '/ingressi', ingresso, config)
      .then((response) => {
        if(response.status == 200){
          this.viewMessage('Ingresso salvato correttamente', true);
        } else {
          this.viewMessage(response.data.error.detail, false);
        }
        this.hideLoader();
      }).catch((error) => {
        this.hideLoader();
        this.viewMessage(response.data.error.detail, false);
        console.log(error);
      });
    },
    viewMessage(message, type) {
      // type == true - apre la modale affermativa
      // type == false - apre la modale negativa
      this.messageView = message;

      if(type) this.affermativeModal = true;
      else this.negativeModal = true;
    },
    closeMessageModal() {
      this.affermativeModal = false;
      this.negativeModal = false;
      this.messageView = '';

      let url = window.location.href;
      if(url.includes('/SelectCustomer')) this.goBack();
    },
    closePopUpSave() {
      this.treatments = '';
      this.notes = '';
      this.prodotti = '';
      this.popup_save = false;
    },
    openPopUpSave(treatments, notes, prodotti, prezzo) {
      this.treatments = treatments;
      this.notes = notes;
      this.prodotti = prodotti;
      this.prezzo = prezzo;
      if(this.treatments != '' && this.prezzo != 0) this.popup_save = true;
      else this.technicalsheetError = true;
    },
    setTechnicalsheetError(value) {
      this.technicalsheetError = value;
    },
    setClearCustomerSelected(value) {
      this.clearCustomerSelected = value;
    }
  },
  mounted() {
    this.checkUserState();
  },
}
</script>
