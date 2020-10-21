import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Work from './views/Work.vue';
import Login from './views/Login.vue';
import Edit from './views/Edit.vue';

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
      component: Work,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
      path: '/editSite',
      name: 'editSite',
      component: Edit,
    },
    {
      path: '*',
      component: Home,
    },
  ],
});

export default router
