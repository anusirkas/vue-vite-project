<template>
  <div class="container">
    <h1>Comments</h1>
    <CommentSection />
  </div>
</template>

<script setup>
import CommentSection from './components/CommentSection.vue';
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
</style>
