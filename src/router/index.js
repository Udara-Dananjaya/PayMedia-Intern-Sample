// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (to.name === 'Login') {
    next();
    return;
  }

  try {
    await store.dispatch('auth/checkAuthStatus');

    if (requiresAuth && !store.getters['auth/authToken']) {
      next('/login');
    } else {
      next();
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    next('/login');
  }
});

export default router;
