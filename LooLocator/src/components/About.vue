<template>
  <div>
    <div class="header">
      <h1>LooLocator</h1>
      <img src="../../public/Group_11.png" alt="Logo" class="logo" />
    </div>
    <div class="tagline">
      <h2>If you need to poo, find the loo nearest to you!</h2>
    </div>
    <div class="vision">
      Our Vision
      <div class="pDiff"> 
        Our mission is to provide the ideal public restroom service, making them
        available and accessible to all and any residents or visitors. Whether it's 
        for leisure or you're in an emergency, these bathroom reviews will do right for you: 
        <br> Find your loo, and enjoy your poo.
      </div>
    </div>
    <div class="stats">
      <div class="stat-box">
        <h3>Users</h3>
        <p class = "description"># of accounts created</p>
      </div>
      <div class="stat-box">
        <h3>Bathrooms</h3>
        <p class = "description"># of bathrooms created</p>
      </div>
      <div class="stat-box">
        <h3>Total Reviews</h3>
        <p class = "description"># of reviews</p>
      </div>
    </div>
    <div class="buttons">
      <button @click="handleLogin">Login</button>
      <button @click="handleSignUp">Sign Up</button>
      <button @click="handleLogin">Contact Us</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  methods: {
    handleLogin() {
      alert('Login button clicked');
    },
    handleSignUp() {
      alert('Sign Up button clicked');
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hachi+Masru+Pop&family=Kalam:wght@300;400;700&display=swap');
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f0f0f0;
  margin: 0;
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 5%;
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
  width: auto;               /* Adjust image size as needed */
  height: auto;              /* Maintain aspect ratio */
  margin-left: 45px;        /* Spacing between image and text */
}
.header h1 {
  margin: 0;
}
.header img {
  height: 50px;
}

.tagline {
  font-family: "Kalam", serif;
  font-size: 16px;
  margin: 0; /* Remove default margin to keep it aligned */
  background-color: white;
  color: #DC7CD4;
  margin: auto;
  width: 600px;
  padding: 0px;
  padding-top: 0px;
  padding-right: 18px;
  padding-left: 18px;
  border-radius: 4px;
}
.vision {
  font-family: "Kalam", serif;
  font-size: 28px;
  background-color: #DC7CD4;
  color: white;
  text-align: center;
  padding: 6px;
  margin-bottom: 0px;
  font-weight: bold;
  margin: 0 10px;
  border-radius: 5px;
}
.pDiff {
  font-family: "Kalam", serif;
  font-style: normal;
  font-size: 22px;
  font-weight: normal;
  color: black;
  background-color: white;
  text-align: center;
  margin-top: 0px;
  padding: 10px;
  margin: 0px;
  border-radius: 5px;
}
.stats {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
.stat-box {
  font-family: "Kalam", serif;
  font-size: 28px;
  font-style: normal;
  background-color: #DC7CD4;
  color: white;
  padding: 6px;
  text-align: center;
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 5px;
}
.stat-box h3 {
  margin-bottom: 10px;
}
.buttons {
  display: flex;
  justify-content: center; /* Center horizontally */
  padding-top: 22px;
}
button {
  font-family: 'Madimi One', sans-serif;
  font-size: 20px;
  padding: 0px;
  padding-right: 20px;
  padding-left: 20px;
  padding: 10px;
  width: 100%;
  max-width: 200px;
  margin-left: 30px;
  margin-left: 15px;
  margin-right: 15px;
  color: white;
  background-color: #8D4CDD;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: #a57bb1;
}

.description{
  font-family: "Kalam", serif;
  font-style: normal;
  font-size: 20px;
  font-weight: normal;
  color: black;
  background-color: white;
  text-align: left;
  margin-top: 0px;
  padding: 10px;
  margin: 0px;
  border-radius: 5px;
}
</style>