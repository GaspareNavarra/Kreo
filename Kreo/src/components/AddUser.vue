<template>
  <div id="AddUser" class="add-user">
    <div class="inputBox col-sm-9">
      <input id="new-username" type="text" required="required" v-model="newUsername" ref="newusername">
      <span>Username</span>
    </div>
    <div class="inputBox col-sm-9">
        <input id="new-password" type="password" required="required" v-model="newPassword" ref="newpassword">
        <span>Password</span>
        <div class="password-eye" @click="setPasswordVisibility('newpassword')">
          <i  class="fa-regular" :class="eyeIconNewPassword?'fa-eye' : 'fa-eye-slash'"></i>
        </div>
    </div>
    <div class="inputBox col-sm-9">
        <input id="repeat-new-password" type="password" required="required" v-model="repeatNewPassword" ref="repeatnewpassword">
        <span>Ripeti Password</span>
        <div class="password-eye" @click="setPasswordVisibility('repeatnewpassword')">
          <i  class="fa-regular" :class="eyeIconRepeatNewPassword?'fa-eye' : 'fa-eye-slash'"></i>
        </div>
    </div>

    <div id="AddUserButton" class="align-button">
        <button class="access-button no-padding col-sm-9" @click="addUser">Aggiungi</button>
    </div>
  </div>
</template>
<script>
import userlist from '@/assets/CryptedPassword.json';
export default {
    inject: ['classSelector'],
    data() {
      return {
        userList: userlist,
        newUsername: '',
        newPassword: '',
        repeatNewPassword: '',
        eyeIconNewPassword: true,
        eyeIconRepeatNewPassword: true,
      }
    },
    methods: {
      setPasswordVisibility(reference) {
        switch(reference) {
          case 'newpassword':
            this.eyeIconNewPassword = !this.eyeIconNewPassword;
            if(this.eyeIconNewPassword)
              this.$refs[reference].type = 'password';
            else
              this.$refs[reference].type = 'text';
            break;

          case 'repeatnewpassword':
            this.eyeIconRepeatNewPassword = !this.eyeIconRepeatNewPassword;
            if(this.eyeIconRepeatNewPassword)
              this.$refs[reference].type = 'password';
            else
              this.$refs[reference].type = 'text';
            break;
        }
      },
      addUser() {
        debugger
        if(this.newUsername !== '' && this.newPassword !== '' && this.repeatNewPassword !== '' && this.newPassword === this.repeatNewPassword) {
          this.userList.users.push({'username': this.newUsername, 'password': this.newPassword});
          userlist = this.userList;
        } else {
          this.$refs.newusername.classList.add('input-error');
          this.$refs.newpassword.classList.add('input-error');
          this.$refs.repeatnewpassword.classList.add('input-error');
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
      this.classSelector();
    }
}
</script>