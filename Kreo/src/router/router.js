import { createRouter, createWebHistory } from 'vue-router';
import Functionality from '@/components/Functionality.vue';
import Login from '@/components/Login.vue';
import DataSheet from '@/components/DataSheet.vue';
import AddUser from '@/components/AddUser.vue';
import NotFound from '@/components/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/Login'},
    {path: '/Login', component: Login},
    {path: '/HomePage', component: Functionality},
    {path: '/DataSheet', component: DataSheet},
    {path: '/AddUser', component: AddUser},
    {path: '/:pathMatch(.*)*', component: NotFound},
  ]
});

export default router
