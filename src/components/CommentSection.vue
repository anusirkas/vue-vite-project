<template>
    <div class="comments-card">
        <CommentList :comments="comments" />
        <CommentForm @add-comment="addComment" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'; // Importing necessary functions from Vue for reactive state management and lifecycle hooks
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';

interface Comment {
  id: number
  user: string
  text: string
  createdAt: Date
}

const comments = ref<Comment[]>([]);

onMounted(() => {
  const savedComments = localStorage.getItem('comments');
  if (savedComments) {
    comments.value = JSON.parse(savedComments);
  }
});

watch(comments, (newComments) => {
  localStorage.setItem('comments', JSON.stringify(newComments));
}, { deep: true });

function addComment(comment: Comment) {
  comments.value.push(comment);
}
</script>