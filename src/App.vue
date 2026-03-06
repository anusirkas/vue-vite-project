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


      <div class="comments-card"><h3>Comments</h3>
        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <div class="avatar">
              {{ getInitials(comment.user) }}
            </div>

            <div class="comment-content">
              <div class="comment-text">
                {{ comment.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <form class="form-section" @submit.prevent="handleSubmit">
            <select v-model="selectedUser">
              <option value="" disabled>Select user</option>
              <option
                v-for="user in users"
                :key="user.id"
                :value="user.name">{{ user.name }}
              </option>
            </select>

            <textarea v-model="message"  class="comment-input" placeholder="Write your comment here..." rows="4"></textarea>
            <button class="submit-btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
]
const comments = ref([]);
const selectedUser = ref('');
const message =  ref('');

function getInitials(name = '') {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

onMounted (() => {
  const saved = localStorage.getItem('comments');
  if (saved) {
    try {
      comments.value = JSON.parse(saved);
    } catch (e) {
      comments.value = []
    }
  }
});

watch(comments, (newComments) => {
  localStorage.setItem('comments', JSON.stringify(newComments));
}, { deep: true })

function handleSubmit() {
  if (!selectedUser.value || !message.value) return
    const comment = {
    id: Date.now(),
    user: selectedUser.value,
    text: message.value,
  }
  comments.value.push(comment);
  message.value = '';
  selectedUser.value = '';
}
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

.date {
  color: #3b5ed7;
  font-weight: 600;
}
</style>