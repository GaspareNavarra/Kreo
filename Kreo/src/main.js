import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';
import MultiSelect from 'primevue/multiselect';
import Lara from '@primevue/themes/lara';

import 'primeicons/primeicons.css'
import './assets/css/main.css';
import './assets/css/primevue.css';
import 'bootstrap/dist/css/bootstrap.css';

window.BASE_URL_API_XANO = 'https://x8ki-letl-twmt.n7.xano.io/api:Fh-KZon-';
//window.BASE_URL_API_CUSTOM = 'http://localhost:3000';
window.BASE_URL_API_CUSTOM = 'https://kreo-be.vercel.app';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  // pt: {
  //   global: {
  //     css: `
  //       .p-datatable-row-selected,
  //       .p-paginator-page-selected {
  //         background-color: #565656!important;
  //       }
  //       .p-datatable-row-selected td,
  //       .p-datatable-row-selected,
  //       .p-paginator-page-selected,
  //       .p-datatable-column-sorted .p-datatable-sort-icon {
  //         color: #fff!important;
  //       }
  //       .p-datatable-tbody > tr.p-datatable-row-selected > td {
  //         border-bottom-color: white!important;
  //       }
  //       .p-datatable-column-sorted {
  //         background-color: #dad6d6!important;
  //       }
  //     `
  //   }
  // },
  theme: {
    preset: Lara,
    options: {
      prefix: 'p',
      darkModeSelector: '',
      cssLayer: false,
    }
  }
});

app.component('Card', Card);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('InputText', InputText);
app.component('Listbox', Listbox);
app.component('MultiSelect', MultiSelect);
app.component('DataTable', DataTable);
app.component('Button', Button);
app.component('Column', Column);

app.mount('#app');
