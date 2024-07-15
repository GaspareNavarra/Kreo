<template>
    <div id="MailContainer" class="no-margin MailContainer">
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
        <textarea id="messaggio" class="col-sm-12 col-12 mail-content" name="messaggio" :style="{height: textAreaHeight + 'vh'}"></textarea>
      </div>
      <div id="button-container" class="row col-sm-12 col-12 no-margin align-button-mail">
        <button class="btn btn-success col-sm-3 col-3">Invia</button>
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
      messaggio: '',
      textAreaHeight: 0
    }
  },
  methods: {
    getCustomerToText() {
      this.customer = JSON.parse(window.localStorage.getItem('customer'));
      this.destinatario = this.customer.email;
    },
    adjustTextareaHeight() {
      const screen = window.innerHeight;
      // 1032 sta a 34 come Screen sta a X
      const height = (((34 * screen)/1032).toFixed(0)) *1 +1;
      this.textAreaHeight = height;
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.adjustTextareaHeight();
    });
    this.adjustTextareaHeight();
    this.classSelector();
    this.getCustomerToText();
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.adjustTextareaHeight();
    });
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
.welcome-message {
  font-size: xx-large!important;
}
</style>
<!-- .disabled-input {
  color: #9899a7;
  border-color: #9899a7;
} -->