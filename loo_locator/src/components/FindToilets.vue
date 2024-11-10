<template>
  <div class="find-toilets">
    <div class="header">
      <h1>Find Nearby Toilets</h1>
    </div>
    <div class="map-container">
      <GMapMap
        v-if="googleLoaded"
        :center="center"
        :zoom="14"
        style="width: 100%; height: 500px;"
      >
        <GMapMarker :position="center" label="You are here" />
        <GMapMarker
          v-for="(toilet, index) in toilets"
          :key="index"
          :position="toilet.location"
          :title="toilet.name"
        />
      </GMapMap>
    </div>
    <div v-if="toilets.length" class="toilets-dropdown">
      <h2>Toilets Found:</h2>
      <select v-model="selectedToilet" @change="handleToiletChange">
        <option v-for="(toilet, index) in toilets" :key="index" :value="toilet">
          {{ toilet.name }} - {{ toilet.address }}
        </option>
      </select>
    </div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: 0, lng: 0 },
      toilets: [],
      selectedToilet: null,
      errorMessage: '',
      googleLoaded: false,
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.loadGoogleMaps();
        },
        (error) => {
          this.errorMessage = 'Could not fetch your location.';
          console.error('Error fetching location: ', error);
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  },
  methods: {
    loadGoogleMaps() {
      if (typeof window.google !== 'undefined') {
        console.log('Google Maps API is already loaded.');
        this.googleLoaded = true;
        this.findNearbyToilets();
      } else {
        const script = document.createElement('script');
        const key = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('Google Maps API script loaded.');
          this.googleLoaded = true;
          this.findNearbyToilets();
        };
        script.onerror = () => {
          this.errorMessage = 'Failed to load Google Maps API.';
          console.error('Error loading Google Maps API script.');
        };
        document.head.appendChild(script);
      }
    },
    findNearbyToilets() {
      if (typeof window.google === 'undefined') {
        this.errorMessage = 'Google Maps API is not loaded.';
        console.error('Google Maps API is not loaded.');
        return;
      }

      const request = {
        location: new window.google.maps.LatLng(this.center.lat, this.center.lng),
        radius: 2000, // Search radius in meters (adjust if necessary)
        type: ['toilet'], // Type of place to search for
      };

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));

      // Perform a nearby search
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          this.toilets = results.map((place) => {
            const toilet = {
              name: place.name,
              address: place.vicinity,
              location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
            };

            return toilet;
          });
        } else {
          this.errorMessage = 'No toilets found nearby.';
        }
      });
    },
    handleToiletChange() {
      if (this.selectedToilet) {
        console.log(`Selected toilet: ${this.selectedToilet.name} - ${this.selectedToilet.address}`);
        // You can add additional logic here to handle the selected toilet
      }
    },
  },
};
</script>

<style scoped>
.find-toilets {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 20px;
  height: 100vh;
  box-sizing: border-box;
}

.header {
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.5em;
  color: #333;
  text-align: center;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.map-container {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  border: 2px solid #007bff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.map-container > div {
  width: 100%;
  height: 100%;
}

.toilets-dropdown {
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
}

.toilets-dropdown select {
  width: 100%;
  padding: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: white;
  font-size: 1em;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
