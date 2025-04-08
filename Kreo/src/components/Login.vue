<template>
  <div id="LoginPage">
    <div class="container-login-input">
      <div class="">
        <div class="title">KREO</div>
        <div class="subtitle">Hair and Makeup Artist</div>
      </div>
      <div class="container-input">
        <div class="inputBox col-sm-9">
          <input id="name" type="text" required="required" v-model="name" />
          <span>Username</span>
        </div>
        <div class="inputBox col-sm-9">
          <input
            id="password"
            type="password"
            required="required"
            v-model="password"
            @keydown="checkKey"
          />
          <span>Password</span>
          <div class="password-eye" @click="setPasswordVisibility()">
            <i
              class="fa-regular"
              :class="eyeIcon ? 'fa-eye' : 'fa-eye-slash'"
            ></i>
          </div>
        </div>
        <div id="actionButton" class="row no-margin">
          <!-- <div id="checkBox" class="col-sm-9 checkbox-container">
              <input id="rememberme" type="checkbox"><div class="remember-label">Ricordami</div>
            </div> -->
          <button @click="doLogin()" class="access-button no-padding col-sm-9">
            Accedi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  inject: [
    "classSelector",
    "Login",
    "showLoader",
    "hideLoader",
    "displayBack",
    "linkTo",
    "getCustomers",
    "viewMessage",
  ],
  data() {
    return {
      email: '',
      password: '',
      eyeIcon: true
    }
  },
  methods: {
    async doLogin() {
      let request = {};
      request.name = this.name;
      request.password = this.password;

      this.showLoader();
      await axios
        .post(window.BASE_URL_API_XANO + "/login", request)
        .then((data) => {
          let response = data.data;
          if (response.user && response.authToken) {
            this.confirmAuthorization(response);
          } else {
            document.getElementById("name").classList.add("input-error");
            document.getElementById("password").classList.add("input-error");
          }
        })
        .catch((error) => {
          document.getElementById("name").classList.add("input-error");
          document.getElementById("password").classList.add("input-error");
          console.log(error);
          this.hideLoader();
          this.viewMessage(error.data.error.detail, false);
        });
    },
    async confirmAuthorization(user_data) {
      const config = {
        headers: { Authorization: `Bearer ${user_data.authToken}` },
      };

      await axios
        .get(window.BASE_URL_API_XANO + "/auth/me", config)
        .then((data) => {
          if (data) {
            localStorage.setItem("user-data", JSON.stringify(user_data));
            this.Login();
            this.getCustomers();
            this.hideLoader();
          } else {
            document.getElementById("name").classList.add("input-error");
            document.getElementById("password").classList.add("input-error");
          }
        })
        .catch((error) => {
          document.getElementById("name").classList.add("input-error");
          document.getElementById("password").classList.add("input-error");
          console.log(error);
          this.hideLoader();
          this.viewMessage(error.data.error.detail, false);
        });
    },
    setPasswordVisibility() {
      this.eyeIcon = !this.eyeIcon;
      if (this.eyeIcon) document.getElementById("password").type = "password";
      else document.getElementById("password").type = "text";
    },
    checkIconState() {
      let input = document.getElementById("password");
      if (this.eyeIcon == true && input.type == "text") {
        input.type = "password";
      }
    },
    checkKey() {
      if (event.key == "Enter") {
        this.doLogin();
      }
    },
  },
  watch: {
    name(newValue, oldValue) {
      if (newValue != oldValue) {
        document.getElementById("name").classList.remove("input-error");
        document.getElementById("password").classList.remove("input-error");
      }
    },
    password(newValue, oldValue) {
      if (newValue != oldValue) {
        document.getElementById("name").classList.remove("input-error");
        document.getElementById("password").classList.remove("input-error");
      }
    },
  },
  mounted() {
    document.getElementById("scheda-tecnica").classList.remove("not-found");
    this.checkIconState();
    this.classSelector();
    this.displayBack();
  },
};
</script>
