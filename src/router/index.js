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

// Navigation guard to check authentication status before each navigation
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  try {
    // Check authentication status using the Vuex store
    await store.dispatch('auth/checkAuthStatus');

    if (requiresAuth && !store.getters['auth/authToken']) {
      // If the route requires authentication and the user is not authenticated, redirect to login
      next('/login');
    } else {
      // Otherwise, proceed with the navigation
      next();
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    next('/login'); // Redirect to login in case of an error
  }
});

export default router;
