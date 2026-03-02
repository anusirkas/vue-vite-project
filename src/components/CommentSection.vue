<template>
    <div>
        <CommentForm @add-comment="addComment" />
        <CommentList :comments="comments" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';

const comments = ref([]);

onMounted(() => {
    const saved = localStorage.getItem('comments');
    if (saved) {
        comments.value = JSON.parse(saved);
    }
});

watch(comments, (newVal) => {
    localStorage.setItem('comments', JSON.stringify(newVal));
}, { deep: true });

function addComment(comment) {
    comments.value.push(comment);
}
</script>