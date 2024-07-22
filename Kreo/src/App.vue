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

    <div id="navbar" class="custom-navbar row col-sm-12 col-12">
      <div class="col-sm-2 col-2">
        <i v-show="back" class="fa-regular fa-arrow-left back-arrow" @click="goBack()"></i>
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
      'Birthday col-sm-4 col-10 mt-4 mt-sm-4': birthday
    }">
      <router-view :empty_subject="empty_subject" :empty_mail_text="empty_mail_text" :back_select_customer_check="back_select_customer_check"></router-view>
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
      changePanelForCustomerSelection: this.changePanelForCustomerSelection
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
      back_select_customer_check: false
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

      if(notFound == 1) {
        this.notFound = true;
      } else if(url.includes('/Login')) {
        this.loginPage = true;
      } else if(url.includes('/HomePage')){
        this.homePage = true
      } else if(url.includes('/SelectCustomer')){
        this.selectCustomerPage = true;
      } else if(url.includes('/Customer')) {
        this.customer = true;
      } else if(url.includes('/BirthDay')) {
        this.birthday = true;
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
    goBack() {
      let url = window.location.href;
      
      if(url.includes('/BirthDay')) {
        this.linkTo('/Customer');
      } else if(url.includes('/SelectCustomer')) {
        this.back_select_customer_check = true;
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
    changePanelForCustomerSelection(value) {
      if(value) {
        this.$refs.scheda_tecnica.classList.remove('col-sm-5');
        this.$refs.scheda_tecnica.classList.add('col-sm-10');
      } else {
        this.$refs.scheda_tecnica.classList.remove('col-sm-10');
        this.$refs.scheda_tecnica.classList.add('col-sm-5');
      }
    }
  },
  mounted() {
    this.checkUserState();
  },
}
</script>
