<template>
  <div class="main-page">
    <div class="header">
      <h1>Your Location</h1>
    </div>
    <div class="map-container">
      <GMapMap
        :center="center"
        :zoom="14"
        style="width: 100%; height: 100%;"
      >
        <GMapMarker :position="center" />
      </GMapMap>
    </div>
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
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  },
};
</script>

<style scoped>
.main-page {
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
</style>