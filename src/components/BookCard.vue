<script setup lang="ts">
    const props = defineProps({
        book: { type: Object}
    })
</script>

<template>
    <div class="book-card">
        <div><img :src="'http://localhost:3000/' + book!.img_book" alt="book_image"></div>
        <div> {{ book!.name }} </div>
        <div> {{ book!.price }}$ </div>
    </div>
</template>

<style scoped>
    .book-card {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        width: 30%;
        margin: 1.5%;
    }
</style>