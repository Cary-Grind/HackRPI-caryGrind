<template>
  <div class="header">
    <h1>LooLocator</h1>
    <img src="/Group_11.png" alt="Logo" class="logo" />
  </div>
  <div class="display-signup"> 
    <h2>Signup Form</h2>
    <button @click="handleLogin">Already have a login? Click here!</button>
  </div>
  <div class="inputs-container">
    <form @submit.prevent="submitForm" class="inputs">
      <div class="email-group">
        <label for="email">Email:</label>
        <input type="email" v-model="form.email" id="email" required placeholder="Enter your email"/>
      </div>
      <div class="username-group">
        <label for="username">Username:</label>
        <input type="text" v-model="form.username" id="username" required placeholder="Enter your name: first, last"/>
      </div>
      <div class="password-group">
        <label for="password">Password:</label>
        <input type="password" v-model="form.password" id="password" required placeholder="Recommended: Create a strong password"/>
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
          if (response.success) {
            alert('Signup successful!'); // You can customize this as needed
          } else {
            this.errorMessage = response.message;
          }
          console.log(response.data);
          alert('Signup successful!'); // You can customize this as needed
        } catch (error) {
          this.errorMessage = error.response ? error.response.data.message : 'Enter better data';
        }
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
  width: auto/2;               /* Adjust image size as needed */
  height: auto/2;              /* Maintain aspect ratio */
  margin-left: 45px;        /* Spacing between image and text */
}

.display-signup {
  font-family: "Kalam", serif;
  font-size: 19px;
  display: flex;
  justify-content: space-between; /* Place h2 on the left, button on the right */
  align-items: center; /* Center vertically */
  max-width: 540px; /* Optional: limit the width of the container */
  margin: auto; /* Center the container on the page */
  padding: 10px;
  color: white;
  border-radius: 8px;; 
}
h2 {
  margin: 0; /* Remove default margin to keep it aligned */
  background-color: white;
  color: #DC7CD4;
  padding: 0px;
  padding-top: 5px;
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 4px;
}
/* Centering the entire form */
.inputs-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  padding-top: 22px;
}

.inputs {
  font-family: "Madimi One", serif;
  font-size: 24px;
  width: 100%;  /* Full width within the container */
  max-width: 500px;  /* Limit form width */
  background-color: #DC7CD4;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

.email-group, .username-group, .password-group {
  display: flex;
  justify-content: space-between; /* Space label and input apart */
  align-items: center; /* Center vertically within the flex container */
  margin-bottom: 15px;
}

label {
  width: 100px; /* Fixed width for label to align across all form groups */
  text-align: left;
  font-weight: bold;
}

input[type='email'],
input[type='text'],
input[type='password'] {
  width: 100%; /* Full width within the flex container */
  max-width: 300px; /* Limit input width for consistency */
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
  max-width: 300px;
  padding: 10px;
  color: white;
  background-color: #8D4CDD;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #6c13d8;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>