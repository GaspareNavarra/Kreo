import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';

import './assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.css';

window.BASE_URL_API = 'https://x8ki-letl-twmt.n7.xano.io/api:Fh-KZon-';

const app = createApp(App);

app.use(router);

app.mount('#app');
