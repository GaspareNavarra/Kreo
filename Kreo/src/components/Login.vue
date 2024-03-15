<template>
    <div id="LoginPage">
      <div class="container-login-input">
        <div class="header">
          <div class="title">KREO</div>
          <div class="subtitle">Hair and Makeup Artist</div>
        </div>
        <div class="container-input">
          <div class="inputBox col-sm-9">
            <input id="username" type="text" required="required" v-model="username">
            <span>Username</span>
          </div>
          <div class="inputBox col-sm-9">
            <input id="password" type="password" required="required" v-model="password">
            <span>Password</span>
            <div class="password-eye" @click="setPasswordVisibility()">
              <i  class="fa-regular" :class="eyeIcon?'fa-eye' : 'fa-eye-slash'"></i>
            </div>
          </div>
          <div id="actionButton" class="row no-margin">
            <div id="checkBox" class="col-sm-9 checkbox-container">
              <input id="rememberme" type="checkbox"><div class="remember-label">Ricordami</div>
            </div>
            <button @click="doLogin" class="access-button no-padding col-sm-9">Accedi</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import userlist from '@/assets/CryptedPassword.json';
export default {
  inject: ['classSelector', 'Login'],
  data() {
    return {
      username: '',
      password: '',
      userList: userlist,
      eyeIcon: true
    }
  },
  methods: {
    doLogin() {
      let user;
      let username;
      let password;

      if(this.userList.username != '' && this.userList.password != '') {
        for(let key in this.userList.users) {
          user = this.userList.users[key];
          if(user.username == this.username && user.password == this.password) {
            username = this.username;
            password = this.password;
            let checked = document.getElementById('rememberme').checked;
            
            if(checked && !this.isLocalStored()) {
              this.setCredentials();
              this.Login();
            } else if(checked && this.isLocalStored()) {
              this.resetCredential();
              this.setCredentials();
              this.Login();
            } else {
              this.Login();
            }
            break;
          }
        }

        if(username != this.username) {
          document.getElementById('username').classList.add('input-error');
        }
        if(password != this.password) {
          document.getElementById('password').classList.add('input-error');
        }
      } else {
        if(user.username != this.username) {
          document.getElementById('username').classList.add('input-error');
        }
        if(user.password != this.password) {
          document.getElementById('password').classList.add('input-error');
        }
      }
    },
    setCredentials() {
      window.localStorage.setItem('username', this.username);
      window.localStorage.setItem('password', this.password);
    },
    resetCredential() {
      window.localStorage.setItem('username', '');
      window.localStorage.setItem('password', '');
    },
    getCredentialStored() {
      if(window.localStorage.getItem('username') != undefined && window.localStorage.getItem('password') != undefined) {
        this.username = window.localStorage.getItem('username');
        this.password = window.localStorage.getItem('password');
      }
    },
    isLocalStored() {
      let username = window.localStorage.getItem('username');
      let password = window.localStorage.getItem('password');

      if(username != undefined && password != undefined) 
        return true;
      else
        return false;
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
  },
  watch: {
    username(newValue, oldValue) {
      if(newValue != oldValue) {
        document.getElementById('username').classList.remove('input-error');
        document.getElementById('password').classList.remove('input-error');
      }
    },
    password(newValue, oldValue) {
      if(newValue != oldValue) {
        document.getElementById('username').classList.remove('input-error');
        document.getElementById('password').classList.remove('input-error');
      }
    },
  },
  mounted() {
    document.getElementById('scheda-tecnica').classList.remove('not-found');
    this.checkIconState();
    this.getCredentialStored();
    this.classSelector();
  },
}
</script>