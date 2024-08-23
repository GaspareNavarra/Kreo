<template>
    <div id="MailContainer" class="row no-margin MailContainer" style="align-content: flex-end;">
      <div class="welcome-message">{{ customer.name + ' ' + customer.surname }}</div>
      <div class="inputBox col-sm-10">
        <input id="receiver" class="disabled-input" type="text" required="required" v-model="destinatario" disabled>
        <span id="destinatario">Destinatario</span>
      </div>
      <div class="inputBox col-sm-10">
        <input id="object" type="text" required="required" v-model="oggetto" :class="{'input-error': error_subject}">
        <span>Oggetto</span>
      </div>
      <div class="inputBox col-sm-10">
        <textarea id="messaggio" class="col-sm-12 col-12 mail-content" :class="{'input-error': error_mail_text}" name="messaggio" :style="{height: textAreaHeight + 'vh'}" v-model="messaggio"></textarea>
        <span ref="textarea_span">Corpo della mail</span>
      </div>
      <div id="button-container" class="row col-sm-12 col-12 no-margin align-button-mail">
        <button class="btn btn-success col-sm-3 col-3" @click="openPopUp()">Invia</button>
      </div>
    </div>
</template>
<script>
export default {
  inject: ['classSelector', 'openPopUpEmail','resetMailError'],
  props: ['empty_subject', 'empty_mail_text'],
  data() {
    return {
      customer: '',
      oggetto: '',
      destinatario: '',
      messaggio: '',
      textAreaHeight: 0,
      error_subject: false,
      error_mail_text: false
    }
  },
  methods: {
    getCustomerToText() {
      this.customer = JSON.parse(localStorage.getItem('customer'));
      this.destinatario = this.customer.email;
    },
    adjustTextareaHeight() {
      const screen = window.innerHeight;
      // 1032 sta a 34 come Screen sta a X
      const height = (((34 * screen)/1032).toFixed(0)) *1 +1;
      this.textAreaHeight = height;
    },
    openPopUp() {
      // {
      //   "email": "example@mail.com",
      //   "subject": "Title of the mail",
      //   "text": "Body of the mail"
      // }
      const mail = {};
      mail.email = this.destinatario;
      mail.subject = this.oggetto;
      mail.text = this.messaggio;
      this.openPopUpEmail(mail);
    }
  },
  watch: {
    empty_subject(newValue) {
      if(newValue) this.error_subject = true;
      else this.error_subject = false;
    },
    empty_mail_text(newValue) {
      if(newValue) this.error_mail_text = true;
      else this.error_mail_text = false;
    },
    oggetto(newValue, oldValue) {
      if(oldValue == '' && newValue != '') {
        this.error_subject = false;
        this.resetMailError('error_subject');
      }
    },
    messaggio(newValue, oldValue) {
      if(oldValue == '' && newValue != '') {
        this.error_mail_text = false;
        this.resetMailError('error_mail_text');
        this.$refs.textarea_span.classList.add('textarea-management');
      } else if(oldValue != '' && newValue == '') {
        this.$refs.textarea_span.classList.remove('textarea-management');
      }
    },

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
  font-size: xx-large!important;
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