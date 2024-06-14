<template>
    <div id="LoginPage">
      <div class="container-login-input">
        <div class="">
          <div class="title">KREO</div>
          <div class="subtitle">Hair and Makeup Artist</div>
        </div>
        <div class="container-input">
          <div class="inputBox col-sm-9">
            <input id="email" type="text" required="required" v-model="email">
            <span>E-mail</span>
          </div>
          <div class="inputBox col-sm-9">
            <input id="password" type="password" required="required" v-model="password" @keydown="checkKey">
            <span>Password</span>
            <div class="password-eye" @click="setPasswordVisibility()">
              <i  class="fa-regular" :class="eyeIcon?'fa-eye' : 'fa-eye-slash'"></i>
            </div>
          </div>
          <div id="actionButton" class="row no-margin">
            <!-- <div id="checkBox" class="col-sm-9 checkbox-container">
              <input id="rememberme" type="checkbox"><div class="remember-label">Ricordami</div>
            </div> -->
            <!-- <div class="register col-sm-9"><a rel="stylesheet" href="javascript:void(0);" @click="linkTo('/AddUser')">Non sei registrato? Registrati</a></div> -->
            <button @click="doLogin" class="access-button no-padding col-sm-9">Accedi</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  inject: ['classSelector', 'Login', 'showLoader', 'hideLoader', 'displayBack', 'linkTo', 'getCustomers'],
  data() {
    return {
      email: '',
      password: '',
      eyeIcon: true
    }
  },
  methods: {
    doLogin() {
      let request = {};
      request.email = this.email;
      request.password = this.password;

      this.showLoader();
      axios.post(window.BASE_URL_API + '/login', request).then((data) => {
        let response = data.data.user;
        if(response.logged == true) {
          // let checked = document.getElementById('rememberme').checked;
          window.localStorage.setItem('user-data', JSON.stringify(response));
          this.Login();
        } else {
          document.getElementById('email').classList.add('input-error');
          document.getElementById('password').classList.add('input-error');
        }
        this.getCustomers();
        this.hideLoader();
      }).catch((error) => {
        document.getElementById('email').classList.add('input-error');
        document.getElementById('password').classList.add('input-error');
        console.log(error);
        this.hideLoader();
      });
    },
    setPasswordVisibility() {
      this.eyeIcon = !this.eyeIcon;
      if(this.eyeIcon)
        document.getElementById('password').type = 'password';
      else
        document.getElementById('password').type = 'text';
    },
    checkIconState() {
      let input = document.getElementById('password');
      if(this.eyeIcon == true && input.type == 'text') {
        input.type = 'password';
      }
    },
    checkKey() {
      if(event.key == 'Enter') {
        this.doLogin();
      }
    }
  },
  watch: {
    email(newValue, oldValue) {
      if(newValue != oldValue) {
        document.getElementById('email').classList.remove('input-error');
        document.getElementById('password').classList.remove('input-error');
      }
    },
    password(newValue, oldValue) {
      if(newValue != oldValue) {
        document.getElementById('email').classList.remove('input-error');
        document.getElementById('password').classList.remove('input-error');
      }
    },
  },
  mounted() {
    document.getElementById('scheda-tecnica').classList.remove('not-found');
    this.checkIconState();
    this.classSelector();
    this.displayBack();
  },
}
</script>