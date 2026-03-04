<template>
  <div class="comment">
    <div class="avatar">
      {{ comment.user.slice(0,2).toUpperCase() }}
    </div>

    <div class="comment-body">
      <div class="comment-meta">
        <strong class="comment-user">{{ comment.user }}</strong>
        <div class="comment-text">{{ comment.text }}</div>
      </div>
      <small>{{ formattedDate }}</small>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const { comment } = defineProps<{
  comment: {
    id: number
    user: string
    text: string
    createdAt: string | Date
  }
}>()

const formattedDate = computed(() =>
  new Date(comment.createdAt).toLocaleString()
)
</script>