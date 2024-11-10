

<template>
  <div>
    <div class="header">
      <h1>LooLocator</h1>
      <img src="C:\hackRPI\HackRPI-caryGrind\loo_locator\public\Group_11.png" alt="Logo" />
    </div>
    <div class="tagline">
      <h2>If you need to poo, find the nearest loo for you!</h2>
    </div>
    <div class="vision">
      Our Vision
    </div>
    <div class="mission">
      <p>
        Our mission is to provide the ideal public restroom service, making them
        available and accessible to all residents and visitors.
      </p>
      <p>Find your loo, and enjoy your poo.</p>
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
    </div>
    <div class="contact">
      <p>Contact us</p>
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
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&family=Kalam:wght@300;400;700&display=swap');
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
  padding-top: 5%;
  font-family: "Hachi Maru Pop", serif;
  font-weight: 400;
  font-style: normal;
  background-color: #DC7CD4;
  padding: 20px;
  display: flex;
  align-items: center;
  color: white;
}
.header h1 {
  margin: 0;
}
.header img {
  height: 50px;
}
.tagline {
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
}
.vision {
  font-family: "Kalam", serif;
  font-weight: 400;
  font-style: normal;
  background-color: #DC7CD4;
  color: white;
  text-align: center;
  padding: 10px;
  font-weight: bold;
  margin: 0 10px;
  border-radius: 5px;
}
.mission {
  font-family: "Kalam", serif;
  font-weight: 400;
  font-style: normal;
  background-color: #e0e0e0;
  text-align: center;
  padding: 20px;
  margin: 20px 10px;
  border-radius: 5px;
}
.stats {
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;
}
.stat-box {
  font-family: "Kalam", serif;
  font-weight: 400;
  font-style: normal;
  background-color: #DC7CD4;
  color: white;
  padding: 20px;
  text-align: center;
  flex: 1;
  margin: 0 5px;
  border-radius: 5px;
}
.stat-box h3 {
  margin-bottom: 10px;
}
.buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  background-color: #DC7CD4;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}
.buttons button:hover {
  background-color: #a57bb1;
}
.contact {  
  padding-top: 5%;
  font-family: "Hachi Maru Pop", serif;
  font-weight: 400;
  background-color: #DC7CD4;
  color: white;
  text-align: center;
  font-size: 40px; 
  padding: 20px;
  margin: 20px 10px;
  border-radius: 5px;
}
.description{
  font-family: "Kalam", serif;
  font-weight: 400;
  font-style: normal;
  background-color: #E5D0FF;
  color: white;
  padding: 20px;
  text-align: center;
  flex: 1;
  margin: 0 5px;
  border-radius: 5px;
}
</style>
