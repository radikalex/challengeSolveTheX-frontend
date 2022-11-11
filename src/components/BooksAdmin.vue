<script lang="ts" setup>
    import { useBookStore } from '../store/book';
    import { useAuthorStore } from '../store/author';
    import { ref } from 'vue'
    import Book from '../interfaces/Book';
    import Author from '../interfaces/Author';

    const bookStore = useBookStore();
    const authorStore = useAuthorStore();
    const author = ref(0);
    const img_book = ref();
    const name = ref('');
    const genre = ref('');
    const num_pages = ref();
    const price = ref('');
    const newBook = ref(true)
    let book_id: number = 0;

    const goEdit = async (edit: boolean, id: number) => {
        newBook.value = !edit;
        if(edit) {
            const book: Book = await bookStore.getBookById(id);
            book_id = book.id;
            name.value = book.name;
            genre.value  = book.genre;
            num_pages.value  = book.num_pages;
            price.value  = book.price.toString();
            author.value = book.AuthorId;
        }
        else {
            book_id = 0;
            name.value = "";
            genre.value  = "";
            num_pages.value  = null;
            price.value  = "";
            author.value = 0;
        }
    }

    const updateBook = async () => {
        await bookStore.updateBookById(book_id, name.value, genre.value, num_pages.value, +price.value, author.value, img_book.value)
        await bookStore.getBooks();
        goEdit(false, 0);
    }

    const deleteBook = async (id: number) => {
        await bookStore.deleteBookById(id)
        await bookStore.getBooks();
    }

    const createBook = async () => {
        await bookStore.createBook(name.value, genre.value, num_pages.value, +price.value, author.value, img_book.value)
        await bookStore.getBooks();
        book_id = 0;
        name.value = "";
        genre.value  = "";
        num_pages.value  = null;
        price.value  = "";
        author.value = 0;
    }

    const inputFileChange = () => {
        const input = document.getElementById('file_input') as HTMLInputElement;
        img_book.value = input.files![0];
    }

</script>

<template>

    <div class="flex justify-center">
        <div class="flex w-11/12 gap-5">
            <div class="flex-1">
                <form enctype="multipart/form-data">
                    <h1 v-if="newBook" class="text-center mb-3 text-xl font-bold">Add new book</h1>
                    <h1 v-else class="text-center mb-3 text-xl font-bold">Edit book</h1>
                    <div class="relative z-0 mb-6 w-full group">
                        <input v-model="name" type="text" id="author_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="author_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <input v-model="genre" type="text" id="genre" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="genre" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Genre</label>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 mb-6 w-full group">
                            <input v-model="num_pages" type="number" name="num_pages" id="num_pages" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="num_pages" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of pages</label>
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                            <input v-model="price" type="text" name="price" id="price" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="price" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                        </div>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload file</label>
                        <input @change="inputFileChange()" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <label for="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Author</label>
                        <select v-model="author" id="author" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled>-- Select an author --</option>
                            <option v-for="author in authorStore.authors" :value="author.id">{{ author.name }}</option>
                        </select>
                    </div>
                    <div class="flex justify-end gap-3">
                        <button type="button" @click="goEdit(false, 0)" v-if="!newBook" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go form - Add new book</button>
                        <button type="button" @click="updateBook()" v-if="!newBook" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                        <button type="button" @click="createBook()" v-if="newBook" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create new book</button>
                    </div>
                  </form>
            </div>
    
            <div class="flex-1">
                <div class="overflow-x-auto relative">
                    <p class="text-center mb-3 text-xl font-bold">Books info</p>
                    <table class="w-full text-sm border-2 border-black-600 text-gray-500 text-center dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Image
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Genre
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Number of pages
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Price
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Author
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in bookStore.books" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="py-2 px-3">
                                    {{ book.name }}
                                </td>
                                <td class="py-2 px-3">
                                    <img class="w-14" :src="'http://localhost:3000/' + book!.img_book" alt="book_image">
                                </td>
                                <td class="py-2 px-3">
                                    {{ book.genre }}
                                </td>
                                <td class="py-2 px-3">
                                    {{ book.num_pages }}
                                </td>
                                <td class="py-2 px-3">
                                    {{ book.price }}
                                </td>
                                <td class="py-2 px-3">
                                    {{ book.Author !== null ? book!.Author.name : "Unknown" }}
                                </td>
                                <td class="py-2 px-3">
                                    <div class="flex flex-col">
                                        <button type="button" @click="goEdit(true, book.id)" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                        <button type="button" @click="deleteBook(book.id)" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>