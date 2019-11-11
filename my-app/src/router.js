import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/Login.vue'),
    },
    {
      path: '/editSite',
      name: 'editSite',
      component: () => import('./components/Edit.vue'),
    }
  ],
});

export default router
