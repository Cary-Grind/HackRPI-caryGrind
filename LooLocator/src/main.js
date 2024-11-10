import { createApp } from 'vue'
import App from './App.vue'
import router from './vrouter';
import VueGoogleMaps from '@fawmi/vue-google-maps';
const APIKEY = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;

const app = createApp(App);
app.use(router);
app.use(VueGoogleMaps, {
    load: {
        key: APIKEY, // Replace with your API key
        libraries: 'places', // Necessary if you use the Places API
    }
});
app.mount('#app');