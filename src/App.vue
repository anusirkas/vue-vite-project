<template>
  <div class="page">
    <div class="weather-card">
      <h2>Weather forecast for Tallinn</h2>

      <div class="weather-item">
        <span class="date">03 January 2026</span>
        <span class="weather-text">🌧 Rain.</span>
      </div>

      <div class="weather-item">
        <span class="date">04 January 2026</span>
        <span class="weather-text">🌧 Periods of rain.</span>
      </div>
    </div>

    <div class="comments-card">      
      <h3>Comments</h3>
      <div>
        <CommentSection />
      </div>
    </div>

  </div>
</template>

<script setup>
import CommentSection from './components/CommentSection.vue';

</script>

<style>
.page {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

.weather-card {
  background: linear-gradient(135deg, #5f77d8, #4e67c6);
  padding: 20px;
  border-radius: 12px;
  color: white;
}

.weather-card h2 {
  margin-bottom: 20px;
}

.weather-item {
  background: #ffffff;
  color: #333;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 12px;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.weather.item {
  display: flex;
}
.date {
  color: #3b5ed7;
  font-weight: 600;
}

.comments-card {
  background: #f3f4f7;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
}

.comments-card h3 {
  margin-bottom: 15px;
  color: #444;
}

.comment {
  background: white;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: left; 
  margin-bottom: 10px;
  color: #333;
}

.avatar {
  width: 36px;
  height: 36px;
  background: #5f77d8;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.comment-text {
  color: #000000;
}

.form-section {
  margin-top: 20px;
  text-decoration: #000000;
}

.user-input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  background-color: white;
  color: #333;
}

.textarea-wrapper {
  position: relative;
}

.comment-input {
  width: 100%;
  height: 100px;
  padding: 10px;
  padding-bottom: 45px;   /* ruum nupu jaoks */
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  background-color: white;
  color: #333;
}

.submit-btn {
  position: absolute;
  left: 60%;
  margin-top: -60px;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  background: #aab6e6;
  color: white;
  cursor: pointer;
}

.submit-btn:hover {
  background: #8f9fdd;
}
</style>