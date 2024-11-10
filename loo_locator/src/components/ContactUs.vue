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
        const response = await axios.post('http://localhost:3000/contact', this.form);
        console.log(response.data);
        this.successMessage = 'Email sent successfully!';
        this.errorMessage = '';
        this.form = { name: '', email: '', message: '' };
      } catch (error) {
        this.errorMessage = 'Failed to send email. Please try again.';
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
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
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
