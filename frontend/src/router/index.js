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
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      layout: 'empty',
    },
  },
  {
    path: '/id',
    name: 'User page',
    component: () => import('../views/UserPage.vue'),
    meta: {
      layout: 'primary',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
