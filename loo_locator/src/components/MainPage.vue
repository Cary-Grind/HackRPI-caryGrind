<template>
    <div class="main-page">
      <h1>Your Location</h1>
      <GMapMap
        :center="center"
        :zoom="14"
        style="width: 100%; height: 500px;"
      >
        <GMapMarker :position="center" />
      </GMapMap>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        center: { lat: 0, lng: 0 }, // Initial coordinates
      };
    },
    mounted() {
      // Get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          },
          (error) => {
            console.error('Error fetching location: ', error);
            alert('Could not fetch your location.');
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    },
  };
  </script>
  
  <style scoped>
  .main-page {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  