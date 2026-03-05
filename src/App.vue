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

        <!-- Comments list (inlined from CommentList + CommentItem) -->
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="comment"
        > <!-- Each comment is wrapped in a div with class 'comment' for styling -->
          <div class="avatar">{{ getInitials(comment.user) }}</div>

          <div class="comment-body"> <!-- This div wraps the username, comment text, and date for better styling -->
            <div class="comment-meta"> <!-- This div wraps the username and comment text for better styling -->
              <strong class="comment-user">{{ comment.user }}</strong>  <!-- Display the username in bold -->
              <div class="comment-text">{{ comment.text }}</div>  <!-- Display the comment text below the username -->
            </div>
            <small>{{ formatDate(comment.createdAt) }}</small>  <!-- Display the formatted date below the comment text -->
          </div>
        </div>
    </div>
    <div>
            <!-- Form (inlined from CommentForm) -->
      <form class="form-section" @submit.prevent="handleSubmit"> <!-- The form submission is handled by the handleSubmit method, and the default form submission behavior is prevented -->
        <select v-model="selectedUser" class="user-input"> <!-- A dropdown to select the user, bound to the selectedUser reactive variable -->
          <option disabled value="">Select user</option> <!-- A disabled option prompting the user to select a user -->
          <option v-for="user in users" :key="user.id" :value="user.name"> <!-- Loop through the users array to create an option for each user, with the user's name as the value -->
            {{ user.name }}
          </option>
        </select>

        <div class="textarea-wrapper"> <!-- A wrapper div for the textarea and submit button to allow for better styling and positioning -->
          <textarea
            v-model="message"
            class="comment-input"
            placeholder="Write a comment..."
          ></textarea>

          <button class="submit-btn" type="submit">Submit</button> <!-- A button to submit the comment -->
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue' // Importing necessary functions from Vue for reactive state management and lifecycle hooks

const users = [ // A hardcoded list of users for the dropdown selection in the comment form
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
]

const comments = ref([]) // A reactive variable to hold the list of comments
const selectedUser = ref('') // A reactive variable to hold the currently selected user from the dropdown
const message = ref('') // A reactive variable to hold the current message input

onMounted(() => { // Lifecycle hook that runs when the component is mounted
  const saved = localStorage.getItem('comments')
  if (saved) {
    try {
      comments.value = JSON.parse(saved)
    } catch (e) {
      comments.value = []
    }
  }
})

watch(comments, (newComments) => { // Watcher that runs whenever the comments array changes
  localStorage.setItem('comments', JSON.stringify(newComments)) // Save the updated comments array to localStorage
}, { deep: true })

function formatDate(d) { // Function to format a date string into a more readable format
  return new Date(d).toLocaleString()
}

function getInitials(name = '') { // Function to get the initials of a user's name
  return String(name)
    .split(' ')
    .map(n => n[0] || '')
    .join('')
    .slice(0,2)
    .toUpperCase()
}

function addComment(comment) { // Function to add a new comment to the comments array
  comments.value.push(comment) //comments.value.unshift(comment) // Add the new comment to the end of the array (use unshift to add to the beginning)
}



function handleSubmit() { // Function to handle the form submission for adding a new comment
  if (!selectedUser.value || !message.value) return

  const comment = { // Create a new comment object with the selected user, message, and current timestamp
    id: Date.now(),
    user: selectedUser.value,
    text: message.value,
    createdAt: new Date().toISOString()   // Store the date as an ISO string for better consistency when saving to localStorage
  }

  addComment(comment) // Add the new comment to the comments array

  // reset the form fields
  message.value = ''
  selectedUser.value = ''
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
  border: 1px solid #ccc;
  resize: none;
  background-color: white;
  color: #333;
  box-sizing: border-box;
}

.textarea-wrapper .submit-btn {
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
.textarea-wrapper .submit-btn:hover { background: #8f9fdd; }
</style>