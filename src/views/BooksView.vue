<script lang="ts" >
import { defineComponent } from 'vue';
import { useBookStore } from '../store/book';
import { onMounted } from 'vue'
import BookCard from '../components/BookCard.vue'

export default defineComponent({
    components: {
        BookCard
    },

    setup() {
        const bookStore = useBookStore();
        onMounted(() => {
            bookStore.getBooks()
        })
        return {
            bookStore,
        };
    },
});
</script>

<template>

    <div class="flex flex-col justify-center">
        <h1>Books</h1>
        <div class="books-container">
            <BookCard v-for="book in bookStore.books" :book="book" />
        </div>
    </div>

</template>

<style scoped>
    .books-container {
        display: flex;
        flex-wrap: wrap;
    }
</style>