import DataSheet from '@/components/DataSheet.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/HomePage'},
    {path: '/HomePage', component: DataSheet},
  ]
});

export default router
