import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Swaps from '@/pages/Swaps.vue';
import Messages from '@/pages/Messages.vue';
import Notifications from '@/pages/Notifications.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: Home,
        meta: { requiresAuth: true }
      },
      {
        path: 'about',
        component: About
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      },
      {
        path: 'swaps',
        component: Swaps,
        meta: { requiresAuth: true }
      },
      {
        path: 'messages',
        component: Messages,
        meta: { requiresAuth: true }
      },
      {
        path: 'notifications',
        component: Notifications,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.token) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
