import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'empty',
    },
  },
  {
    path: '/complete-registration',
    name: 'CompleteRegistration',
    component: () => import('@/views/CompleteRegistration.vue'),
    meta: {
      layout: 'empty',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'empty',
    },
  },
  {
    path: '/id:id',
    name: 'UserPage',
    component: () => import('@/views/UserPage.vue'),
    meta: {
      layout: 'primary',
    },
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('@/views/Messages.vue'),
    meta: {
      layout: 'primary',
    },
  },
  {
    path: '*',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      layout: 'empty',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
