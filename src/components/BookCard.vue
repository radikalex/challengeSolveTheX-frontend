<script setup lang="ts">
    import { useBookStore } from '../store/book';
    import { ref, onBeforeMount } from 'vue'
    import Author from '../interfaces/Author';

    const props = defineProps({
        book: { type: Object}
    })

    let author_name = ref('');
    const bookStore = useBookStore();

    onBeforeMount(async () => {
        const author: Author = await bookStore.getAuthorById(props.book!.AuthorId);
        author_name.value = author.name;
    })
</script>

<template>
    <div class="book-card">
        <div><img :src="'http://localhost:3000/' + book!.img_book" alt="book_image"></div>
        <div class="body-card">
            <div class="flex flex-col"><span class="font-bold">Title:</span> {{ book!.name }} </div>
            <div class="flex flex-col"><span class="font-bold">Price:</span> {{ book!.price }}$ </div>
            <div class="flex flex-col"><span class="font-bold">Genre:</span> {{ book!.genre }} </div>
            <div class="flex flex-col"><span class="font-bold">Author:</span> {{ author_name }} </div>
        </div>
    </div>
</template>

<style scoped>
    .book-card {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        width: 22.5%;
        margin: 1.25%;
        height: 100%;
    }

    .body-card {
        padding: 10px 20px;
        height: 100%;
        gap: 5px;
        display: flex;
        flex-direction: column;
    }

    img {
        width: 100%;
    }
</style>