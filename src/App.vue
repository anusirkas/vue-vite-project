<template>
  <main class="app">
    <section class="comment-section">
      <form class="comment-form" @submit.prevent="addComment">
        <label>
          User
          <select v-model="newUser" class="user-input">
            <option value="" disabled>Select user</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>
        </label>

        <label>
          Comment
          <textarea v-model="newText" class="comment-input" rows="3" placeholder="Write a comment"></textarea>
        </label>

        <button type="submit" class="submit-btn">Add comment</button>
      </form>

      <ul class="comment-list">
        <li v-for="c in comments" :key="c.id" class="comment-item">
          <div class="comment-header"><strong class="comment-user">{{ c.user }}</strong></div>
          <p class="comment-body">{{ c.text }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const comments = ref([
  { id: 1, user: 'John Doe', text: 'First comment' }
])

const newUser = ref('')
const newText = ref('')

function addComment() {
  const text = newText.value && newText.value.trim()
  if (!newUser.value || !text) return

  comments.value.push({
    id: Date.now(),
    user: newUser.value,
    text
  })

  newUser.value = ''
  newText.value = ''
}
</script>

<style scoped>
.app { padding: 1rem; font-family: system-ui, Arial, sans-serif; }
.comment-form { display: flex; flex-direction: column; gap: .5rem; max-width: 40rem; }
.user-input, .comment-input { width: 100%; box-sizing: border-box; padding: .5rem; }
.submit-btn { align-self: start; padding: .5rem 1rem; }
.comment-list { margin-top: 1rem; list-style: none; padding: 0; }
.comment-item { padding: .5rem; border-bottom: 1px solid #eee; }
.comment-user { margin-right: .5rem; }
</style>