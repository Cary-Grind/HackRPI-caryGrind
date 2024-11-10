// main.js
import { createApp } from 'vue';
import App from './App.vue';
import VueGoogleMaps from '@fawmi/vue-google-maps';

// Create and configure the Vue app
const app = createApp(App);

// Use the VueGoogleMaps plugin with the API key from the .env file
app.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY, // Load the API key from .env
    libraries: 'places', // Load the 'places' library if needed
  },
});

// Mount the app
app.mount('#app');
