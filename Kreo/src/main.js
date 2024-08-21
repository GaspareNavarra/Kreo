import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import Column from 'primevue/column';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import Aura from '@primevue/themes/aura';

import './assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.css';

window.BASE_URL_API_XANO = 'https://x8ki-letl-twmt.n7.xano.io/api:Fh-KZon-';
//window.BASE_URL_API_CUSTOM = 'http://localhost:3000';
window.BASE_URL_API_CUSTOM = 'https://kreo-be.vercel.app';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '',
      cssLayer: false,
    }
  }
});
app.component('DataTable', DataTable);
app.component('Button', Button);
app.component('Column', Column);
app.component('Rating', Rating);
app.component('Tag', Tag);

app.mount('#app');
