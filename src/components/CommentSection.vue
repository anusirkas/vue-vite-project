<template>
    <div>
        <CommentForm @add-comment="addComment" />
        <CommentList :comments="comments" />
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

onMounted(() => { //    Lifecycle hook to run code when the component is mounted
    const saved = localStorage.getItem('comments'); //  Retrieve saved comments from localStorage
    if (saved) { // Check if there are saved comments
        comments.value = JSON.parse(saved); // Parse the saved comments and set them to the reactive variable
    }
});

watch(comments, (newVal) => {
    localStorage.setItem('comments', JSON.stringify(newVal));
}, { deep: true });

function addComment(comment: Comment) {
  comments.value.push(comment);
}

</script>