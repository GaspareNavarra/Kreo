<template>
  <div id="MainBody">
    <div id="navbar" class="custom-navbar">
      <!-- <i class="fa-regular fa-arrow-left"></i> -->
      <img src="/Img/Logo.png" class="logo_size">
      <div v-show="userState" id="logoutButton" class="logout-button col-sm-1" @click="doLogout">Logout</div>
    </div>
    
    <div id="scheda-tecnica" class="datasheet_size row">
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
    }
  },
  data() {
    return {
      userState: false
    }
  },
  methods: {
    classSelector() {
      if(window.location.href.includes('/Login')) {
        document.getElementById('scheda-tecnica').classList.add('login-size_pannel');
      } else {
        if(document.getElementById('scheda-tecnica').classList.value.includes('login-size_pannel'))
          document.getElementById('scheda-tecnica').classList.value.remove('login-size_pannel');
      }
    },
    Login() {
      if(document.getElementById('scheda-tecnica').classList.value.includes('login-size_pannel'))
          document.getElementById('scheda-tecnica').classList.remove('login-size_pannel');

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
    }
  },
  mounted() {
    this.setUserState();
  },
}
</script>
