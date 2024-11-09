<template>
    <div class="signup-form">
      <h2>Signup Form</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="form.username" id="username" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="form.email" id="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="form.password" id="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          username: '',
          email: '',
          password: '',
        },
        errorMessage: '',
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post('http://localhost:3000/signup', this.form);
          console.log(response.data);
          alert('Signup successful!'); // You can customize this as needed
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
  