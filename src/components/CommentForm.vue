<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add-comment', comment: {
    id: number
    user: string
    text: string
    createdAt: Date
  }): void
}>()

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
]

const selectedUser = ref('')
const message = ref('')

//handleSubmit:
//  lisa uus comment array’sse
//   salvesta array localStorage’i

function handleSubmit() {
  if (!selectedUser.value || !message.value) return

  emit('add-comment', {
    id: Date.now(),
    user: selectedUser.value,
    text: message.value,
    createdAt: new Date()
  })

  message.value = ''
}
</script>

<template>
  <form class="form-section" @submit.prevent="handleSubmit">
    <select v-model="selectedUser" class="user-input">
      <option disabled value="">Select user</option>
      <option v-for="user in users" :key="user.id" :value="user.name">
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
</template>

<style scoped>
 .textarea-wrapper { position: relative; }
 .comment-input { padding-bottom: 56px; }
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