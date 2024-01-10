// store/auth.js
import axios from 'axios';
import router from '../router';

const state = {
  authToken: localStorage.getItem('authToken') || null,
};

const mutations = {
  SET_AUTH_TOKEN(state, token) {
    state.authToken = token;
    localStorage.setItem('authToken', token);
  },
};

const actions = {
  setAuthToken({ commit }, token) {
    commit('SET_AUTH_TOKEN', token);
    console.log(token);
  },
  async checkAuthStatus() {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        // Handle the case where there is no authToken available
        router.push('/login');
        return Promise.reject('No authToken available');
      }

      const response = await axios.post('http://127.0.0.1:8000/api/checkToken', {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response); // Log the entire response object

      if ( response.data.success) {
        return Promise.resolve();
      } else {
        if ( response.data.message === 'Unauthenticated.') {
          router.push('/login');
        }
        return Promise.reject();
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      return Promise.reject(error);
    }
  },
};

const getters = {
  authToken: (state) => state.authToken,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
