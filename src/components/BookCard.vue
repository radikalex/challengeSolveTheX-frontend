<script setup lang="ts">
    import { useBookStore } from '../store/book';
    import Book from '../interfaces/Book';

    const props = defineProps({
        book: { type: Object}
    })

    const bookStore = useBookStore();

    const addProductToCart = () => {
        let found: Boolean = false;
        
        bookStore.cart.forEach((item) => {

            if(item.book.id === props.book!.id) {
                item.amount++;
                found = true;
                return;
            }
        })

        const book: Book = {
            id: props.book!.id,
            name: props.book!.name,
            price: props.book!.price,
            img_book: props.book!.img_book,
            num_pages: props.book!.num_pages,
            genre: props.book!.genre,
            AuthorId: props.book!.AuthorId,
            Author: props.book!.Author
        }

        if(!found) {
            bookStore.cart.push({
                book: book,
                amount: 1
            })
        }

    }
</script>

<template>
    <div class="book-card">
        <div><img :src="'http://localhost:3000/' + book!.img_book" alt="book_image"></div>
        <div class="body-card">
            <div class="flex flex-col"><span class="font-bold">Title:</span> {{ book!.name }} </div>
            <div class="flex flex-col"><span class="font-bold">Price:</span> {{ book!.price }}$ </div>
            <div class="flex flex-col"><span class="font-bold">Number of pages:</span> {{ book!.num_pages }} </div>
            <div class="flex flex-col"><span class="font-bold">Genre:</span> {{ book!.genre }} </div>
            <div class="flex flex-col"><span class="font-bold">Author:</span> {{ book!.Author !== null ? book!.Author.name : "Unknown"}} </div>
        </div>
        <div class="flex justify-center border-t-4 border-black-500">
            <button @click="addProductToCart()" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 my-2 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
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