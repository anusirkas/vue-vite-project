<template>
  <div class="comment">
    <div class="avatar">
      {{ comment.user.slice(0,2).toUpperCase() }}
    </div>

    <div>
      <div>{{ comment.text }}</div>
      <small>{{ formattedDate }}</small>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  comment: {
    id: number
    user: string
    text: string
    createdAt: Date
  }
}>()

const formattedDate = computed(() =>
  new Date(props.comment.createdAt).toLocaleString()
)
</script>