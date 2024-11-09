<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="form.email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="form.password" id="password" required />
      </div>
      <button type="submit">Log In</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm', // Multi-word name for the component
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/login', this.form);
        console.log(response.data);
        alert('Login successful!'); // Customize this as needed
      } catch (error) {
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred';
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
