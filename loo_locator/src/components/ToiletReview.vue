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
        @click="handleMarkerClick(toilet)"
      />
    </GMapMap>
    <div v-if="toilets.length">
      <h2>Toilets Found:</h2>
      <ul class="toilet-list">
        <li v-for="(toilet, index) in toilets" :key="index" class="toilet-item">
          <div class="toilet-info">
            <span class="toilet-name">{{ toilet.name }}</span>
            <span class="toilet-address">{{ toilet.address }}</span>
          </div>
          <button @click="viewReviews(toilet)" class="view-reviews-button">View Reviews</button>
        </li>
      </ul>
    </div>
    <div v-if="errorMessage">{{ errorMessage }}</div>

    <!-- Review form modal -->
    <div v-if="showReviewForm" class="review-form-modal">
      <h2>Submit a Review for {{ selectedToilet.name }}</h2>
      <form @submit.prevent="submitReview">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="newReview.username" required />
        </div>
        <div>
          <label for="rating">Rating:</label>
          <input type="number" id="rating" v-model="newReview.rating" required min="1" max="5" />
        </div>
        <div>
          <label for="comment">Comment:</label>
          <textarea id="comment" v-model="newReview.comment" required></textarea>
        </div>
        <button type="submit">Submit Review</button>
        <button type="button" @click="closeReviewForm">Cancel</button>
      </form>
    </div>

    <!-- Display reviews for the selected toilet -->
    <div v-if="selectedToiletForReviews && reviews.length">
      <h2>Reviews for {{ selectedToiletForReviews.name }} at {{ selectedToiletForReviews.address }}</h2>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          <strong>{{ review.username }}</strong> ({{ review.rating }}): {{ review.comment }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      center: { lat: 0, lng: 0 },
      toilets: [],
      reviews: [],
      errorMessage: '',
      googleLoaded: false,
      showReviewForm: false,
      selectedToilet: null,
      selectedToiletForReviews: null,
      newReview: {
        username: '',
        rating: '',
        comment: '',
      },
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
    handleMarkerClick(toilet) {
      this.selectedToilet = toilet;
      this.showReviewForm = true;
    },
    async submitReview() {
      try {
        // Submit the new review to the backend
        const response = await axios.post('http://localhost:3000/reviews', {
          ...this.newReview,
          name: this.selectedToilet.name,
          address: this.selectedToilet.address,
        });
        console.log('Review submitted:', response.data);
        // Reset the form and close the modal
        this.newReview = { username: '', rating: '', comment: '' };
        this.showReviewForm = false;
        alert('Review submitted successfully!');
        // Do not fetch reviews here to avoid displaying them immediately
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Please try again.');
      }
    },
    async viewReviews(toilet) {
      try {
        const response = await axios.get('http://localhost:3000/reviews', {
          params: { name: toilet.name, address: toilet.address },
        });
        this.reviews = response.data;
        this.selectedToiletForReviews = toilet;
      } catch (error) {
        console.error('Error fetching reviews:', error);
        alert('Failed to fetch reviews. Please try again.');
      }
    },
    closeReviewForm() {
      this.showReviewForm = false;
    },
  },
};
</script>

<style scoped>
.toilet-locator {
  /* Your styles */
}

.toilet-list {
  list-style-type: none;
  padding: 0;
}

.toilet-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.toilet-info {
  display: flex;
  flex-direction: column;
}

.toilet-name {
  font-weight: bold;
}

.toilet-address {
  color: #666;
}

.view-reviews-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.view-reviews-button:hover {
  background-color: #0056b3;
}

.review-form-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.review-form-modal h2 {
  margin-top: 0;
}

.review-form-modal form {
  display: flex;
  flex-direction: column;
}

.review-form-modal form div {
  margin-bottom: 10px;
}

.review-form-modal form button {
  margin-top: 10px;
}
</style>