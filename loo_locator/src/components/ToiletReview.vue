<template>
  <div class="toilet-review">
    <h1>Nearby Toilets</h1>
    <div id="map" class="map-container"></div>
    <div v-if="toilets.length" class="toilets-dropdown">
      <h2>Toilets Found:</h2>
      <select v-model="selectedToilet" @change="handleToiletChange">
        <option v-for="(toilet, index) in toilets" :key="index" :value="toilet">
          {{ toilet.name }} - {{ toilet.address }}
        </option>
      </select>
      <button @click="viewReviews(selectedToilet)" class="view-reviews-button">View Reviews</button>
    </div>
    <div v-if="errorMessage">{{ errorMessage }}</div>

    <!-- Search filter for reviews -->
    <div v-if="reviews.length" class="search-filter">
      <input type="text" v-model="searchQuery" placeholder="Search comments..." @input="filterReviews" />
      <input type="number" v-model="searchRating" placeholder="Search by rating..." @input="filterReviews" min="1" max="5" />
    </div>

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
    <div v-if="selectedToiletForReviews && filteredReviews.length" class="reviews-section">
      <h2>Reviews for {{ selectedToiletForReviews.name }} at {{ selectedToiletForReviews.address }}</h2>
      <ul>
        <li v-for="(review, index) in filteredReviews" :key="index">
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
      map: null,
      toilets: [],
      selectedToilet: null,
      reviews: [],
      filteredReviews: [],
      searchQuery: '',
      searchRating: '',
      errorMessage: '',
      googleLoaded: false,
      showReviewForm: false,
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
        this.initMap();
      } else {
        const script = document.createElement('script');
        const key = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('Google Maps API script loaded.');
          this.googleLoaded = true;
          this.initMap();
        };
        script.onerror = () => {
          this.errorMessage = 'Failed to load Google Maps API.';
          console.error('Error loading Google Maps API script.');
        };
        document.head.appendChild(script);
      }
    },
    initMap() {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: this.center,
        zoom: 14,
      });

      new window.google.maps.Marker({
        position: this.center,
        map: this.map,
        label: 'You are here',
      });

      this.findNearbyToilets();
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

      const service = new window.google.maps.places.PlacesService(this.map);

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

            // Add marker for each toilet
            const marker = new window.google.maps.Marker({
              position: toilet.location,
              map: this.map,
              title: toilet.name,
            });

            marker.addListener('click', () => {
              this.handleMarkerClick(toilet);
            });

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
        this.filteredReviews = this.reviews;
        this.selectedToiletForReviews = toilet;
      } catch (error) {
        console.error('Error fetching reviews:', error);
        alert('Failed to fetch reviews. Please try again.');
      }
    },
    filterReviews() {
      const query = this.searchQuery.toLowerCase();
      const rating = this.searchRating;
      this.filteredReviews = this.reviews.filter(review =>
        review.comment.toLowerCase().includes(query) &&
        (rating === '' || review.rating == rating)
      );
    },
    handleToiletChange() {
      if (this.selectedToilet) {
        console.log(`Selected toilet: ${this.selectedToilet.name} - ${this.selectedToilet.address}`);
        // You can add additional logic here to handle the selected toilet
      }
    },
    closeReviewForm() {
      this.showReviewForm = false;
    },
  },
};
</script>

<style scoped>
.toilet-review {
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
  height: 500px;
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

.view-reviews-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.view-reviews-button:hover {
  background-color: #0056b3;
}

.search-filter {
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
}

.search-filter input {
  width: 100%;
  padding: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  font-size: 1em;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
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

.reviews-section {
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.reviews-section h2 {
  margin-top: 0;
}

.reviews-section ul {
  list-style-type: none;
  padding: 0;
}

.reviews-section li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.reviews-section li:last-child {
  border-bottom: none;
}
</style>