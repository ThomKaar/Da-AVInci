import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Work from './views/Work.vue';
import Edit from './views/Edit.vue';
import NotFound from './views/NotFound.vue';

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
      path: '/editSite',
      name: 'editSite',
      component: Edit,
    },
    { 
      path: '/404', 
      component: NotFound 
    },  
    { 
      path: '*', 
      redirect: '/404' 
    },  
  ],
});

export default router
