<template>
  <div id="MainBody">
    <div id="navbar" class="custom-navbar">
      <img src="/Img/Logo.png" class="logo_size">
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
      getCookieByName: this.getCookieByName,
    }
  },
  methods: {
    classSelector() {
      if(window.location.href.includes('/Login')) {
        document.getElementById('scheda-tecnica').classList.add('login-size_pannel');
      } else {
        if(document.getElementById('scheda-tecnica').classList.includes('login-size_pannel'))
          document.getElementById('scheda-tecnica').classList.remove('login-size_pannel');
      }
    },
    getCookieByName(cookiename) {
      let name = cookiename + '=';
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');

      for(let index in ca) {
        let c = ca[index];
        while(c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if(c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
  }
}
</script>
