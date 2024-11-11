import { createApp } from 'vue'
import App from './App.vue'
import VueGoogleMaps from '@fawmi/vue-google-maps';




const app = createApp(App);
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCF_zQA5quwiJ0Absat5w35Ly9Ch2H2MRw', // Replace with your API key
    libraries: 'places', // Necessary if you use the Places API
  },
});
app.mount('#app');

  