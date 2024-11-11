<template>
    <div class="contact-us">
        <h1>Contact Us</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" v-model="form.name" id="name" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" v-model="form.email" id="email" required />
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" v-model="form.message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
        </form>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'ContactUs',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        // Make a POST request to your backend endpoint
        const response = await axios.post('http://localhost:3000/contact', this.form);
        this.successMessage = 'Your message has been sent successfully!';
        this.errorMessage = '';
        console.log(response.data); // Log response from the server
      } catch (error) {
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred';
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.contact-us {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>



