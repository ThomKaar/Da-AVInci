import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

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
      path: '/work',
      name: "Work",
      component: () => import('./views/Work.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/Login.vue'),
    },
    {
      path: '/editSite',
      name: 'editSite',
      component: () => import('./views/Edit.vue'),
    },
    {
      path: '*',
      component: Home,
    },
  ],
});

export default router
