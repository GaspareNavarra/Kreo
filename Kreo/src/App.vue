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
          <button class="btn btn-success col-sm-3 col-3 back-popup-button" @click="closePopUpEmail()">Annulla</button>
          <button class="btn btn-success col-sm-3 col-3" @click="sendMail()">Conferma</button>
        </div>
      </div>
    </div>

    <div id="navbar" class="custom-navbar row col-sm-12 col-12">
      <div class="col-sm-2 col-2">
        <i v-show="back" class="fa-regular fa-arrow-left back-arrow" @click="goBack()"></i>
      </div>
      <img src="/Img/LogoNew.png" class="logo_size">
      <div class="col-sm-2  col-2 container-logout">
        <div v-show="userState" id="logoutButton" class="logout-button col-8 col-sm-8" @click="doLogout()">
          <i class="fa-solid fa-power-off logout-icon"></i>
          <span style="color: #fff;">Logout</span>
        </div>
      </div>
    </div>

    <!-- <BirthDay v-show="userState" :customerList="customerList" :userState="userState"></BirthDay> -->
    
    <div id="scheda-tecnica" class="datasheet_size"
    :class="{
      'login-size_pannel col-9 col-sm-5': loginPage,
      'Homepage col-11 col-sm-9 mt-4 mt-sm-5': homePage,
      'not-found': notFound,
      'select_customer_size': selectCustomerPage,
      'Customer col-11 col-sm-9 mt-4 mt-sm-5': customer,
      'Birthday col-sm-4 col-10 mt-4 mt-sm-4': birthday
    }">
      <router-view></router-view>
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
      openPopUpEmail: this.openPopUpEmail
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
      email: {}
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
    setUserState() {
      let logged = window.localStorage.getItem('isAuth');

      if(logged === 'true') {
        this.userState = false;
        window.localStorage.setItem('isAuth', this.userState);
      }
    },
    doLogout() {
      this.showLoader();
      let request = { 'users_id': JSON.parse(window.localStorage.getItem('user-data')).id *1};

      axios.post(window.BASE_URL_API_XANO + '/logout', request).then((data) => {
        let response = data.data;
        if(!response.logged) {
          this.userState = false;
          window.localStorage.setItem('isAuth', this.userState);
          window.localStorage.setItem('user-data', '');
          this.linkTo('/');
        }
        this.hideLoader();
      }).catch((error) => {
        this.hideLoader();
        console.log(error);
      });
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
      } 
      else this.linkTo('/HomePage');
    },
    showMessageModal() {
      this.notFound = true;
      this.homePage = false;
      this.loginPage = false;
      this.back = false;
    },
    getCustomers() {
      this.showLoader();
      axios.get(window.BASE_URL_API_XANO + '/customer').then((data) => {
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
      // axios.post(window.BASE_URL_API_CUSTOM + '/send-mail', this.email)
      axios.post('https://kreo-be.vercel.app/send-mail', this.email)
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
    }
  },
  mounted() {
    this.setUserState();
  },
}
</script>
