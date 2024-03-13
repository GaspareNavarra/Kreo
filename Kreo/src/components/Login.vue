<template>
    <div id="LoginPage">
      <div class="container-login-input">
        <div class="header">
          <div class="title">KREO</div>
          <div class="subtitle">Hair and Makeup Artist</div>
        </div>
        <div class="container-input">
          <div class="inputBox col-sm-9">
            <input type="text" required="required" v-model="username">
            <span>Username</span>
          </div>
          <div class="inputBox col-sm-9">
            <input type="text" required="required" v-model="password">
            <span>Password</span>
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
  inject: ['classSelector', 'getCookieByName'],
  data() {
    return {
      username: '',
      password: '',
      userList: userlist,
    }
  },
  methods: {
    doLogin() {
      let user;

      if(this.userList.username != '' && this.userList.password != '') {
        for(let key in this.userList.users) {
          user = this.userList.users[key];
          
          if(user.username == this.username && user.password == this.password) {
            let checked = document.getElementById('rememberme').checked;
            
            if(checked && !this.isCookied()) {
              this.setCookie();
            } else {
              
            }
            break;
          }
        }
      }
    },
    setCookie() {
      document.cookie = 'username=' + this.username + ';path=http://localhost/web6pm/';
      document.cookie = 'password=' + this.password + ';path=http://localhost/web6pm/';
    },
    getCookie() {
      this.username = this.getCookieByName('username');
      this.password = this.getCookieByName('password');
    },
    isCookied() {
      debugger
      let username = this.getCookieByName('username');
      let password = this.getCookieByName('password');

      if(username != '' && password != '') 
        return true;
      else
        return false;
    },
  },
  mounted() {
    this.getCookie();
    this.classSelector();
  },
}
</script>