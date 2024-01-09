// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
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
    path: '/login',
    name: 'Login',
    component: Login
  },
  // Add other routes here
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  try {
    console.log('Checking auth status...'); // Add this line for debugging
    await store.dispatch('auth/checkAuthStatus');

    if (requiresAuth && !store.getters['auth/authToken']) {
      console.log('Redirecting to login due to missing authToken...'); // Add this line for debugging
      next('/login');
    } else {
      console.log('Authentication status is valid. Proceeding with the navigation.'); // Add this line for debugging
      next();
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    console.log('Redirecting to login due to an error...'); // Add this line for debugging
    next('/login');
  }
});


export default router;
