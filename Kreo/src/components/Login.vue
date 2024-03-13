<template>
    <div id="LoginPage">
      <div class="container-login-input">
        <div class="header">
          <div class="title">KREO</div>
          <div class="subtitle">Hair and Makeup Artist</div>
        </div>
        <div class="container-input">
          <div class="inputBox col-sm-9">
            <input type="text" required="required">
            <span>Username</span>
          </div>
          <div class="inputBox col-sm-9">
            <input type="text" required="required">
            <span>Password</span>
          </div>
          <div id="actionButton" class="row no-margin">
            <div id="checkBox" class="col-sm-9 checkbox-container">
              <input type="checkbox"><div class="remember-label">Ricordami</div>
            </div>
            <button class="access-button no-padding col-sm-9">Accedi</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  inject: ['classSelector'],
  mounted() {

    this.classSelector();
  }
}
</script>