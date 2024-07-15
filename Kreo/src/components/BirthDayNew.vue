<template>
  <div id="MailForm">
    <div id="MailContainer" class="row no-margin">
      <div class="welcome-message col-sm-12">{{ customer.name + ' ' + customer.surname }}</div>
      <div class="inputBox col-sm-8">
        <input id="receiver" class="disabled-input" type="text" required="required" v-model="destinatario" disabled>
        <span id="destinatario">Destinatario</span>
      </div>
      <div class="inputBox col-sm-8">
        <input id="object" type="text" required="required" v-model="oggetto">
        <span>Oggetto</span>
      </div>
      <div class="inputBox col-sm-8">
        <textarea class="col-sm-12 mail-content" name="messaggio" id="messaggio" cols="48" rows="10" ></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['classSelector'],
  data() {
    return {
      customer: '',
      oggetto: '',
      destinatario: '',
      messaggio: ''
    }
  },
  methods: {
    getCustomerToText() {
      this.customer = JSON.parse(window.localStorage.getItem('customer'));
      this.destinatario = this.customer.email;
    }
  },
  mounted() {
    this.classSelector();
    this.getCustomerToText();
  }
}
</script>
<style scoped>
.welcome-message {
  margin-bottom: 6%;
}
.inputBox span {
  left: 15px!important;
}
.inputBox #receiver {
  border-color: #9899a7;
}
.inputBox input ~ #destinatario {
  color: #9899a7;
  transform: translateX(10px) translateY(-7px);
  font-size: 0.7em;
  padding: 0 10px;
  background: #fff;
  border: solid 1px #c6c7d2;
  border-radius: 5px;
}
.inputBox {
  margin-bottom: 3vh;
}
</style>
<!-- .disabled-input {
  color: #9899a7;
  border-color: #9899a7;
} -->