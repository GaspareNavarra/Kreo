<template>
  <div id="BirthdayList">
    <div class="birthday-box" :class="{'closed-birthday-box': isClosed}">
      <div class="arrow-birthday-box" :class="{'open-birthday-box': !isClosed}" @click="openBox">
        <i class="fa-solid fa-cake-candles birthday-cake"></i>
        <i class="fa-solid fa-angle-right angle-right" :class="{'close-arrow': !isClosed}"></i>
      </div>
      <div id="CustomersBirthDay"  v-show="!showMessageModal">
        <div class="birthday-title">Clienti che oggi compiono gli anni! 🎉</div>
        <div class="box-customer-birthday" v-if="getCustomersBirthDayList.length > 0">
          <div  v-for="(customer, index) in getCustomersBirthDayList" :key="index" class="align-birthday-customers">
            <div :id="'customer_' + index" class="birthday-row">{{ customer.name + ' ' + customer.surname }}
              <i class="fa-solid fa-message align-birthday-message-icon" @click="openMessageModal(customer.email)"></i>
            </div>
            
          </div>
        </div>
        <div v-else class="box-customer-birthday no-birthday-message">
          <i class="fa-solid fa-circle-exclamation no-birthday-icon"></i>
          <div class="no-birthday-label">Nessun compleanno previsto per oggi </div>
        </div>
        
      </div>
      <div id="sendMessageModal" v-if="showMessageModal" class="row">
        <textarea name="birthdayMessage" id="birthdayMessage" class="textarea-message col-sm-10" :placeholder="placeholder_textarea" v-model="message"></textarea>
        <div class="container-message-button">
          <button class="annulla-button col-sm-5" @click="back">Annulla</button>
          <button class="invia-button col-sm-5" @click="sendMessage">Invia</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['customerList', 'userState'],
  data() {
    return {
      isClosed: true,
      showMessageModal: false,
      getCustomersBirthDayList: [],
      default_message: '',
      placeholder_textarea: 'Scrivi un messaggio di auguri come "' + this.default_message + '" oppure clicca il tasto "invia" lasciando il box vuoto per inviare il messaggio di default.\n(Quello usato come esempio)',
      message: ''
    }
  },
  methods: {
    openBox() {
      this.isClosed = !this.isClosed;
    },
    getCustomersBirthDay() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      today = dd + '/' + mm + '/' + yyyy;

      let customerBirthday;

      Object.values(this.customerList).forEach((customer) => {
        customerBirthday = customer.data_di_nascita.split('-');
        customerBirthday = customerBirthday[2] + '/' + customerBirthday[1] + '/' + customerBirthday[0];

        if(customerBirthday == today) {
          this.getCustomersBirthDayList.push(customer);
        }
      });
    },
    openMessageModal(email) {
      this.showMessageModal = true;
      window.localStorage.setItem('customerMail', email);
    },
    back() {
      this.showMessageModal = false;
      window.localStorage.setItem('customerMail', undefined);
    },
    sendMessage() {
      // const nodemailer = require('nodemailer');

      // async function sendEmail() {
      //   try {
      //     const transporter = nodemailer.createTransport({
      //       service: 'Gmail',
      //       auth: {
      //         user: 'your-email@gmail.com',
      //         pass: 'your-password'
      //       }
      //     });

      //     const mailOptions = {
      //       from: 'your-email@gmail.com',
      //       to: 'recipient@example.com',
      //       subject: 'Hello',
      //       text: 'This is the body of the email.'
      //     };

      //     const info = await transporter.sendMail(mailOptions);
      //     console.log('Email sent:', info.messageId);
      //   } catch (error) {
      //     console.error('Error occurred:', error);
      //   }
      // }

      // sendEmail();
    }
  },
  watch: {
    customerList() {
      this.getCustomersBirthDay();
      console.log(this.getCustomersBirthDayList);
    },
    userState(newValue) {
      if(!newValue) {
        this.isClosed = true;
      }
    }
  }
}
</script>
<style scoped>
textarea {
  resize: none;
}
</style>