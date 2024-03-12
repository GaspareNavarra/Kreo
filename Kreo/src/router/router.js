import DataSheet from '@/components/DataSheet.vue';
import Login from '@/components/Login.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/Login'},
    {path: '/Login', component: Login},
    {path: '/HomePage', component: DataSheet},
  ]
});

export default router
