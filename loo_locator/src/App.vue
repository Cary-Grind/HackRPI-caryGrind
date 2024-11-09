<template>
  <div id="app">
    <SignupForm />
    <LogIn />
    <ContactUs />
    <MainPage />
    <FindToilets />
  </div>
</template>

<script>
import SignupForm from './components/SignupForm.vue';
import LogIn from './components/login.vue';
import ContactUs from './components/ContactUs.vue';
import MainPage from './components/MainPage.vue';
import FindToilets from './components/FindToilets.vue';

export default {
  name: 'App',
  components: {
    SignupForm,
    LogIn,
    ContactUs,
    MainPage,
    FindToilets,
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
<router-link to="/signup">Signup</router-link>
<router-link to="/login">Login</router-link>
<router-link to="/contact">Contact Us</router-link>