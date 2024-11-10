<template>
  <div class="toilet-locator">
    <h1>Nearby Toilets</h1>
    <GMapMap
      v-if="googleLoaded"
      :center="center"
      :zoom="14"
      style="width: 100%; height: 500px;"
    >
      <!-- Marker for the user's location -->
      <GMapMarker :position="center" label="You are here" />

      <!-- Markers for the nearby toilets -->
      <GMapMarker
        v-for="(toilet, index) in toilets"
        :key="index"
        :position="toilet.location"
        :title="toilet.name"
      />
    </GMapMap>
    <div v-if="toilets.length">
      <h2>Toilets Found:</h2>
      <ul>
        <li v-for="(toilet, index) in toilets" :key="index">
          {{ toilet.name }} - {{ toilet.address }}
        </li>
      </ul>
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
  },
};
</script>
