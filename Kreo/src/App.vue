<template>
  <div id="MainBody">
    <div v-show="loader" class="container-loader">
      <div class="center-loader">
        <div class="loader-text">Loading...</div>
        <div class="ring"></div>
      </div>
    </div>

    <div id="navbar" class="custom-navbar">
      <i v-show="back" class="fa-regular fa-arrow-left back-arrow" @click="goBack()"></i>
      <img src="/Img/Logo.png" class="logo_size">
      <div v-show="userState" id="logoutButton" class="logout-button col-sm-1" @click="doLogout">Logout</div>
    </div>

    <BirthDay v-show="userState" :customerList="customerList" :userState="userState"></BirthDay>
    
    <div id="scheda-tecnica" class="datasheet_size row" :class="{'login-size_pannel': loginPage, 'functionality-page': homePage, 'not-found': notFound}">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import BirthDay from '@/components/BirthDay.vue';

export default {
  components: { BirthDay },
  provide() {
    return {
      classSelector: this.classSelector,
      Login: this.Login,
      linkTo: this.linkTo,
      showLoader: this.showLoader,
      hideLoader: this.hideLoader,
      displayBack: this.displayBack,
      showMessageModal: this.showMessageModal,
      getCustomers: this.getCustomers
    }
  },
  data() {
    return {
      userState: false,
      loginPage: true,
      homePage: false,
      notFound: false,
      loader: false,
      back: false,
      customerList: [],
    }
  },
  methods: {
    classSelector(notFound) {
      let url = window.location.href;
      if(notFound == 1) {
        this.notFound = true;
        this.homePage = false;
        this.loginPage = false;
      } else if(url.includes('/Login') || url.includes('/AddUser')) {
        this.notFound = false;
        this.homePage = false;
        this.loginPage = true;
      } else if(url.includes('/HomePage')){
        this.notFound = false;
        this.homePage = true
        this.loginPage = false;
      } else {
        this.notFound = false;
        this.homePage = false;
        this.loginPage = false;
      }

      if(!url.includes('/Login') && !url.includes('/HomePage'))
        this.back = true;
      else
        this.back = false;
    },
    Login() {
      if(this.loginPage)
        this.loginPage = false;

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

      axios.post(window.BASE_URL_API + '/logout', request).then((data) => {
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
      
      if(url.includes('/AddUser'))
        this.linkTo('/Login');
      else
        this.linkTo('/HomePage');
    },
    showMessageModal() {
      this.notFound = true;
      this.homePage = false;
      this.loginPage = false;
      this.back = false;
    },
    getCustomers() {
      this.showLoader();
      axios.get(window.BASE_URL_API + '/customer').then((data) => {
        let response = data.data;
        this.customerList = response;
        window.localStorage.setItem('customerList', JSON.stringify(this.customerList));
        this.hideLoader();
      }).catch((error) => {
        this.hideLoader();
        console.log(error);
      });
    },
  },
  mounted() {
    this.setUserState();
    console.log('import.meta.env.BASE_URL: ' + import.meta.env.BASE_URL);
  },
}
</script>
