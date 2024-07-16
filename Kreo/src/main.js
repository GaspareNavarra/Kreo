import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';

import './assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.css';

window.BASE_URL_API_XANO = 'https://x8ki-letl-twmt.n7.xano.io/api:Fh-KZon-';
//window.BASE_URL_API_CUSTOM = 'http://localhost:3000';
window.BASE_URL_API_CUSTOM = 'https://kreo-be.vercel.app';

const app = createApp(App);

app.use(router);

app.mount('#app');
