<template>
    <div class="comment">
        <strong>{{ comment.user.name }}</strong>
        <p>{{ comment.message }}</p>
        <small>{{ formattedDate }}</small>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    comment: Object
});

const formattedDate = computed(() => {
    return new Date(props.comment.createdAt).toLocaleString();
});

</script>

<style>
.comment {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
}
</style>