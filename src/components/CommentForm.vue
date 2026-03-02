<template>
    <form @submit.prevent ="submitComment">
        <select v-model="selectedUser">
            <option disabled value="">Select User</option>
            <option v-for="user in users" :key="user.id" :value="user.name">
                {{ user.name }}
            </option>
        </select>

        <input
            v-model="message"
            type="text"
            placeholder="Write a comment..." required
        />
        <button type="submit">Submit</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'; // Importing ref for reactive state management

const emit = defineEmits(['add-comment']); // Define an event emitter for adding comments

const message = ref(''); // Reactive variable to hold the comment message
const selectedUser = ref(''); // Reactive variable to hold the selected user

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

function submitComment() { // Function to handle comment submission
    if (!message.value  || !selectedUser.value) return // Prevent submission if message or user is not selected
    emit('add-comment', { // Emit the add-comment event with the new comment data
        id: Date.now(), // Generate a unique ID for the comment
        user: selectedUser.value, //    Set the user for the comment
        text: message.value, // Set the comment message
        createdAt: new Date()  // Set the creation date for the comment
    }); // Emit the add-comment event with the new comment data

    message.value = ''; // Clear the message input after submission
    selectedUser.value = ''; // Clear the selected user after submission
}
</script>