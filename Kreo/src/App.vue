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
    }
  }
}
</script>
