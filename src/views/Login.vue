<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="loginData.email" required>

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="loginData.password" required>

      <button type="submit">Login</button>
    </form>
  </div>
</template>
<!-- eslint-disable -->

<script>

import axios from 'axios';

export default {
  name: 'login',
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post( 'http://127.0.0.1:8000/api/login', {
          email: this.loginData.email,
          password: this.loginData.password
        });

        if (response.data.status) {
          this.$store.dispatch('auth/setAuthToken', response.data.token);
          this.$router.push('/home');
        } else {
          this.$swal('Error', response.data.error || 'Invalid credentials. Please try again.', 'error');
        }

        // Use Vue.set or spread syntax (...) for reactivity
        this.loginData = {
          email: '',
          password: ''
        };
      } catch (error) {
        console.error('Error during login:', error);
        this.$swal('Error', 'An error occurred during login. Please try again.', 'error');
      }
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input {
  padding: 8px;
  margin-bottom: 12px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
