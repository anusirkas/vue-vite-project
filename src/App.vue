<template>
  <main class="app">
    <section class="comment-section">
      <form class="comment-form" @submit.prevent="addComment">
        <label>
          User
          <select v-model="newUser" class="user-input">
            <option value="">Select user</option>
            <option
              v-for="user in users"
              :key="user"
              :value="user"
            >
              {{ user }}
            </option>
          </select>
        </label>

        <label>
          Comment
          <textarea v-model="newText" class="comment-input" rows="3" placeholder="Write a comment"></textarea>
        </label>

        <button type="submit" class="submit-btn">
          Add comment
        </button>
      </form>

      <ul class="comment-list">
        <li v-for="c in comments" :key="c.id" class="comment-item">
          <div class="comment-header">
            <div class="avatar">
              {{ getInitials(c.user) }}
            </div>

            <div class="comment-meta">
              <strong class="comment-user">{{ c.user }}</strong>
              <span class="comment-date">
                {{ formatDate(c.created_at) }}
              </span>
            </div>
          </div>
          <p class="comment-body">{{ c.text }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue' // Importing the ref function from Vue to create reactive state variables

const comments = ref([]) // Reactive variable to hold the list of comments

const users = [
  'John Doe',
  'Jane Smith'
] // Array of users to populate the dropdown

const newUser = ref('') // Reactive variable to hold the selected user from the dropdown
const newText = ref('') // Reactive variable to hold the text input for the new comment

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString()
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('')
}

onMounted(() => {
  const savedComments = localStorage.getItem('comments')
  if (savedComments) {
    comments.value = JSON.parse(savedComments)
  }
})

watch(comments, (newComments) => {
  localStorage.setItem('comments', JSON.stringify(newComments))
}, { deep: true })

function addComment() {
  const text = newText.value && newText.value.trim()
  if (!newUser.value || !text) return

  comments.value.unshift({ // Adding a new comment to the beginning of the comments array. .push would add it to the end.
    id: Date.now(),
    user: newUser.value,
    text,
    created_at: new Date().toISOString()
  })

  newUser.value = ''
  newText.value = ''
  console.log('Comment added:', comments.value)
}

</script>

<style scoped>
.app {
  padding: 1rem;
  font-family: system-ui,
  Arial, sans-serif;
  background: linear-gradient(135deg, rgb(61, 61, 160), rgb(110, 80, 133));
  color: white;
  max-width: 600px;
  margin: 0 auto;

}
.comment-form {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  max-width: 40rem;
}

.user-input, .comment-input {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  color: rgb(2, 35, 35);
  background-color: bisque;
}

.submit-btn {
  align-self:auto;
  background-color: rgb(2, 35, 35);
  color: white;
  border: none;
  padding: .5rem 1rem;
}

.comment-list {
  margin-top: 1rem;
  list-style: none;
  padding: 0;
}

.comment-item {
  padding: .5rem;
  border-bottom: 1px solid #eee;
}

.comment-user {
  margin-right: .5rem;
}
.comment-header {
  display: flex;
  align-items: center;
  gap: .5rem;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgb(2, 35, 35);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
}

.comment-meta {
  display: flex;
  flex-direction: column;
}

.comment-date {
  font-size: 0.8rem;
  opacity: 0.7;
}

</style>