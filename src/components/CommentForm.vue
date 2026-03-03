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
  <div class="form-section">
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
    </div>


    <button class="submit-btn" @click="handleSubmit">
      Submit
    </button>
  </div>
</template>