<template>
  <div id="app">
    <router-link to="/signup">Signup</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/contact">Contact Us</router-link>
    <router-link to="/mainpage">Main Page</router-link>
    <router-link to="/about">About Us</router-link>
    <router-link to="/seereview">View Reviews</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import SignupForm from '../src/components/SignupForm.vue';
import LoginForm from '../src/components/login.vue';
import ContactUs from '../src/components/ContactUs.vue';
import MainPage from '../src/components/MainPage.vue';
import AboutUs from '../src/components/About.vue';
import ToiletReview from '../src/components/ToiletReview.vue';

export default {
  name: 'App',
  components: {
    SignupForm,
    LoginForm,
    ContactUs,
    MainPage,
    AboutUs,
    ToiletReview,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
