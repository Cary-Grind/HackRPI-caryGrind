<template>
  <div class="header">
    <h1>LooLocator</h1>
    <img src="/Group_11.png" alt="Logo" class="logo" />
  </div>
    <div>
      <div class="contact-us">
        <h1>Contact Us</h1>
      </div>
        <form @submit.prevent="submitForm">
          <div class="container">
            <div class="form-group">
              <label for="name">Username:</label>
              <input type="text" v-model="form.name" id="name" required placeholder="Enter your LooLocater Username"/>
            </div>  
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" v-model="form.email" id="email" required placeholder="Enter your email so we can get back to you"/>
            </div>
            <div class="form-group">
              <label for="message">Message:</label>
              <textarea id="message" v-model="form.message" required placeholder="Let us know what issues you're having!"></textarea>
            </div>
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
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&family=Kalam:wght@300;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Madimi+One&display=swap');
body {
  background-color: #F2E7FF; 
  margin: 0; /* Remove default margin */
}
.header {
  display: flex;
  align-items: center;       /* Center-align items vertically */
  justify-content: center;   /* Center content horizontally */
  font-family: "Hachi Maru Pop", serif;
  font-size: 24px;
  background-color: #DC7CD4;
  color: white;
  max-width: 600px;
  padding: 10px 20px;        /* Padding on top/bottom and left/right */
  margin: 0 auto 15px auto;  /* Center the header on the page */
  border-radius: 4px;
}
.logo {
  width: auto.2;               /* Adjust image size as needed */
  height: auto/2;              /* Maintain aspect ratio */
  margin-left: 45px;        /* Spacing between image and text */
}
.contact-us {
font-family: "Kalam", serif;
font-size: 19px;
background-color: white;
color: #DC7CD4;
max-width: 600px;
margin: 0 auto;
padding: 0px;
padding-left: 10px;
text-align: middle;
border-radius: 8px;
}
.container {
max-width: 600px;
margin: 0 auto;
padding: 0px;
text-align: left;
font-family: "Kalam", serif;
font-size: 19px;
color: white;
}
.form-group {
font-family: 'Madimi One', sans-serif;
font-size: 20px;
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 15px;
padding: 10px;
color: white;
background-color: #DC7CD4;
}
label {
display: block;
font-weight: bold;
}
input[type='text'],
input[type='email'] {
border: 2px solid #6c13d8;
border-radius: 2px;
width: 100%; /* Full width within the flex container */
max-width: 300px; /* Limit input width for consistency */
padding: 10px;
border: 2px solid #6c13d8;
border-radius: 2px;
}

input, textarea {
width: 100%;
padding: 8px;
margin-top: 5px;
box-sizing: border-box;
border: 2px solid #6c13d8;
border-radius: 2px;
width: 100%; /* Full width within the flex container */
max-width: 480px; /* Limit input width for consistency */
min-width: 480px;
padding: 10px;
border: 2px solid #6c13d8;
border-radius: 2px;
}

button {
font-family: 'Madimi One', sans-serif;
font-size: 20px;
padding: 0px;
padding-right: 20px;
padding-left: 20px;
width: 100%;
max-width: 330px;
padding: 10px;
color: white;
background-color: #8D4CDD;
border: none;
border-radius: 4px;
cursor: pointer;
max-width: 330px;
}

button:hover {
background-color: #6c13d8;
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



