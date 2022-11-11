<script lang="ts">
import { defineComponent } from 'vue';
import { useBookStore } from '../store/book';
import { onMounted, ref } from 'vue'
import BookCard from '../components/BookCard.vue'

export default defineComponent({
    components: {
        BookCard
    },

    setup() {
        const bookStore = useBookStore();
        const search = ref('');

        const searchBooksByName = () => {
            console.log("entra search");
            
            if(search.value.trim() === "")
                bookStore.getBooks()
            else
                bookStore.getBooksFilterByName(search.value)
        }

        onMounted(() => {
            bookStore.getBooks()
        })
        return {
            bookStore,
            search,
            searchBooksByName
        };
    },
});
</script>

<template>

    <div class="flex flex-col justify-center">
        <form class="search mt-5">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" @keyup="searchBooksByName" v-model="search" id="default-search" class="block mb-4 p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search a book..." required>
            </div>
        </form>
        <div class="books-container">
            <BookCard v-for="book in bookStore.books" :book="book" />
            <p class="mt-3" v-if="bookStore.books.length === 0">No books found...</p>
        </div>
    </div>

</template>

<style scoped>
    .books-container {
        align-self: center;
        display: flex;
        flex-wrap: wrap;
        width: 80%;
    }

    .search {
        width: 80%;
        align-self: center;
    }
</style>