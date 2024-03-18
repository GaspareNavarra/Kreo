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
    
    <div id="scheda-tecnica" class="datasheet_size row" :class="{'login-size_pannel': loginPage, 'functionality-page': homePage, 'not-found': notFound}">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      classSelector: this.classSelector,
      Login: this.Login,
      linkTo: this.linkTo,
      showLoader: this.showLoader,
      hideLoader: this.hideLoader,
      displayBack: this.displayBack
    }
  },
  data() {
    return {
      userState: false,
      loginPage: true,
      homePage: false,
      notFound: false,
      loader: false,
      back: false
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
      this.userState = false;
      window.localStorage.setItem('isAuth', this.userState);
      this.linkTo('/');
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
      this.linkTo('/HomePage');
    }
  },
  mounted() {
    this.setUserState();
  },
}
</script>
