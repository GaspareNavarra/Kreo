<template>
  <div id="AddUser" class="add-user">
    <div v-show="!messageModal">
      <div class="fill-data">Inserisci I Tuoi Dati</div>
      <div class="inputBox col-sm-9">
        <input id="name" type="text" required="required" v-model="name" ref="name">
        <span>Nome</span>
      </div>
      <div class="inputBox col-sm-9">
        <input id="surname" type="text" required="required" v-model="surname" ref="surname">
        <span>Cognome</span>
      </div>
      <div class="inputBox col-sm-9">
        <input id="email" type="text" required="required" v-model="email" ref="email">
        <span>E-mail</span>
      </div>
      <div class="inputBox col-sm-9">
        <input id="password" type="password" required="required" v-model="password" ref="password">
        <span>Password</span>
        <div class="password-eye" @click="setPasswordVisibility('password')">
          <i  class="fa-regular" :class="eyeIconPassword?'fa-eye' : 'fa-eye-slash'"></i>
        </div>
      </div>
      <div class="inputBox col-sm-9">
        <input id="repeat-password" type="password" required="required" v-model="repeatPassword" ref="repeatpassword">
        <span>Ripeti Password</span>
        <div class="password-eye" @click="setPasswordVisibility('repeatpassword')">
          <i  class="fa-regular" :class="eyeIconRepeatPassword?'fa-eye' : 'fa-eye-slash'"></i>
        </div>
      </div>

      <div id="AddUserButton" class="align-button">
        <button class="access-button no-padding col-sm-9" @click="addUser">Aggiungi</button>
      </div>
    </div>
    <div id="messageModal" v-show="messageModal" class="row container-message-modal">
      <i class="fa-regular fa-circle-check check"></i>
      <div class="message-label">Registrazione Completata!</div>
      <div class="">
        <button class="message-button col-sm-6" @click="linkTo('/Login')">Torna alla Home</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
    inject: ['classSelector', 'linkTo', 'showMessageModal', 'showLoader', 'hideLoader'],
    data() {
      return {
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: '',
        eyeIconPassword: true,
        eyeIconRepeatPassword: true,
        messageLabel: '',
        messageModal: false
      }
    },
    methods: {
      setPasswordVisibility(reference) {
        switch(reference) {
          case 'password':
            this.eyeIconPassword = !this.eyeIconPassword;
            if(this.eyeIconPassword)
              this.$refs[reference].type = 'password';
            else
              this.$refs[reference].type = 'text';
            break;

          case 'repeatpassword':
            this.eyeIconRepeatPassword = !this.eyeIconRepeatPassword;
            if(this.eyeIconRepeatPassword)
              this.$refs[reference].type = 'password';
            else
              this.$refs[reference].type = 'text';
            break;
        }
      },
      addUser() {

        if(this.name !== '' && this.surname !== '' && this.email !== '' && this.password != '' && this.repeatPassword != '' && this.password === this.repeatPassword) {
          this.showLoader();
          let request = {'name': this.name, 'surname': this.surname, 'password': this.password, 'email': this.email, 'rememberMe': false, "logged": false};
          axios.post(window.BASE_URL_API_XANO + '/users', request).then((data) => {
            let response = data.data;
            if(response.created) {
              this.name = '';
              this.surname = '';
              this.email = '';
              this.password = '';
              this.repeatPassword = '';
              this.showMessageModal();
              this.messageModal = true;
            } else {
              if(this.name == '') this.$refs.name.classList.add('input-error');
              if(this.surname == '') this.$refs.surname.classList.add('input-error');
              if(this.email == '') this.$refs.email.classList.add('input-error');
              if(this.password == '') this.$refs.password.classList.add('input-error');
              if(this.repeatPassword == '') this.$refs.repeatpassword.classList.add('input-error');
            }
            this.hideLoader();
          }).catch((error) => {
            if(this.name == '') this.$refs.name.classList.add('input-error');
            if(this.surname == '') this.$refs.surname.classList.add('input-error');
            if(this.email == '') this.$refs.email.classList.add('input-error');
            if(this.password == '') this.$refs.password.classList.add('input-error');
            if(this.repeatPassword == '') this.$refs.repeatpassword.classList.add('input-error');
            this.hideLoader();
            console.log(error);
          });
        } else {
          if(this.name == '') this.$refs.name.classList.add('input-error');
          if(this.surname == '') this.$refs.surname.classList.add('input-error');
          if(this.email == '') this.$refs.email.classList.add('input-error');
          if(this.password == '') this.$refs.password.classList.add('input-error');
          if(this.repeatPassword == '') this.$refs.repeatpassword.classList.add('input-error');
        }
      },
    },
    watch: {
        name() {
          if(this.$refs.name.classList.value.includes('input-error'))
            this.$refs.name.classList.remove('input-error');
        },
        surname() {
          if(this.$refs.surname.classList.value.includes('input-error'))
            this.$refs.surname.classList.remove('input-error');
        },
        email() {
          if(this.$refs.email.classList.value.includes('input-error'))
            this.$refs.email.classList.remove('input-error');
        },
        password() {
          if(this.$refs.password.classList.value.includes('input-error'))
            this.$refs.password.classList.remove('input-error');
        },
        repeatPassword() {
          if(this.$refs.repeatpassword.classList.value.includes('input-error'))
            this.$refs.repeatpassword.classList.remove('input-error');
        }

    },
    mounted() {
      this.classSelector();
    }
}
</script>