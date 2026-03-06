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

          <select v-model="selectedUser" class="user-input">
            <option value="" disabled>Select user</option>
            <option
              v-for="user in users"
              :key="user.id"
              :value="user.name">
              {{ user.name }}
            </option>
          </select>

          <div class="textarea-wrapper">

            <textarea
              v-model="message"
              class="comment-input"
              placeholder="Write a comment..."
            ></textarea>

            <button class="submit-btn" type="submit">
            Submit
            </button>

          </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];

const comments = ref([]);
const message = ref('');
const selectedUser = ref('');

function getInitials(name = '') {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

onMounted(() => {
  const storedComments = localStorage.getItem('comments');
  if (storedComments) {
    try {
      comments.value = JSON.parse(storedComments);
    } catch (e) {
      console.error('Failed to parse comments from localStorage:', e);
    }
  }
});

watch(comments, (newComments) => {
  localStorage.setItem('comments', JSON.stringify(newComments));
}, { deep: true });

function handleSubmit() {
  if (message.value.trim() === '' || selectedUser.value === '') {
    return;
  }

  const newComment = {
    id: Date.now(),
    user: selectedUser.value,
    text: message.value
  };

  comments.value.push(newComment);
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

.comments-card {
  background: #f3f4f7;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
}

.comments-card h3 {
  margin-bottom: 30px;
  color: #444;
  text-align: left;
}

.comment-item {
  background: white;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: left;
  margin-bottom: 10px;
  color: #333;
  border: 1px solid #e3e6ef;
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

.form-section {
  margin-top: 20px;
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
  padding-bottom: 56px;   /* space for button */
  border-radius: 8px;
  border: 1px solid #cfd6f0;
  resize: none;
  background-color: white;
  color: #333;
  box-sizing: border-box;
}
.comment-text {
  color: #444;
  font-size: 14px;
}

.comment-content {
  display: flex;
  flex-direction: column;
}

.submit-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 8px 12px;
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