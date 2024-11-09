<template>
  <div id="app">
    <SignupForm />
    <LogIn />
  </div>
</template>

<script>
import SignupForm from './components/SignupForm.vue';
import LogIn from './components/login.vue';

export default {
  name: 'App',
  components: {
    SignupForm,
    LogIn,
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