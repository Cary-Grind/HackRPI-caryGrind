<template>
    <div class="toilet-forum">
      <h1>Toilet Review</h1>
  
      <!-- Form to Submit a Review -->
      <form @submit.prevent="submitReview">
        <div class="form-group">
          <label for="username">Name:</label>
          <input type="text" v-model="newReview.username" id="username" required />
        </div>
  
        <div class="form-group">
          <label for="rating">Rating:</label>
          <select v-model="newReview.rating" id="rating" required>
            <option value="">Select a rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} Star(s)</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="comment">Comment:</label>
          <textarea v-model="newReview.comment" id="comment" required></textarea>
        </div>
  
        <button type="submit">Submit Review</button>
      </form>
  
      <!-- Display List of Reviews -->
      <div v-if="reviews.length">
        <h2>Reviews:</h2>
        <ul>
          <li v-for="(review, index) in reviews" :key="index">
            <p><strong>{{ review.username }}</strong> rated it {{ review.rating }} star(s)</p>
            <p>{{ review.comment }}</p>
          </li>
        </ul>
      </div>
      <p v-else>No reviews yet. Be the first to leave one!</p>
    </div>
  </template>
  <script>
  import axios from 'axios'; // Use axios for HTTP requests
  
  export default {
    data() {
      return {
        newReview: {
          username: '',
          rating: '',
          comment: '',
        },
        reviews: [], // Array to store reviews
      };
    },
    methods: {
      async submitReview() {
        try {
          // Post the new review to the backend
          const response = await axios.post('http://localhost:3000/reviews', this.newReview);
          
          // Add the new review to the list and reset the form
          this.reviews.push(response.data);
          this.newReview = { username: '', rating: '', comment: '' };
          alert('Review submitted successfully!');
        } catch (error) {
          console.error('Error submitting review:', error);
          alert('Failed to submit review. Please try again.');
        }
      },
      async fetchReviews() {
        try {
          // Fetch the existing reviews from the backend
          const response = await axios.get('http://localhost:3000/reviews');
          this.reviews = response.data;
        } catch (error) {
          console.error('Error fetching reviews:', error);
          alert('Failed to load reviews. Please try again.');
        }
      },
    },
    mounted() {
      // Fetch reviews when the component is mounted
      this.fetchReviews();
    },
  };
  </script>
  
  