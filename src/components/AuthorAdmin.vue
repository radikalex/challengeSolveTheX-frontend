<script lang="ts" setup>
    import { useAuthorStore } from '../store/author';
    import { ref } from 'vue'
    import Author from '../interfaces/Author';

    const authorStore = useAuthorStore();
    const name = ref('');
    const age = ref();
    const genre = ref('female')
    const newAuthor = ref(true)
    let author_id: number = 0;

    const goEdit = async (edit: boolean, id: number) => {
        newAuthor.value = !edit;
        if(edit) {
            const author: Author = await authorStore.getAuthorById(id);
            author_id = author.id;
            name.value = author.name;
            age.value = author.age;
            genre.value = author.genre;
        }
        else {
            name.value = "";
            age.value = null;
            genre.value = "female";
        }
    }

    const updateAuthor = async () => {
        await authorStore.updateAuthorById(author_id, name.value, age.value, genre.value)
        await authorStore.getAllAuthors();
        goEdit(false, 0);
    }

    const deleteAuthor = async (id: number) => {
        await authorStore.deleteAuthorById(id)
        await authorStore.getAllAuthors();
    }

    const createAuthor = async () => {
        await authorStore.createAuthor(name.value, age.value, genre.value)
    }

</script>

<template>

    <div class="flex justify-center">
        <div class="flex w-11/12 gap-5">
            <div class="flex-1">
                <form>
                    <h1 v-if="newAuthor" class="text-center mb-3 text-xl font-bold">Add new author</h1>
                    <h1 v-else class="text-center mb-3 text-xl font-bold">Edit author</h1>
                    <div class="relative z-0 mb-6 w-full group">
                        <input v-model="name" type="text" id="author_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="author_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <input v-model="age" type="number" id="age" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="age" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <label for="genre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Genre</label>
                        <select v-model="genre" id="genre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="female">female</option>
                            <option value="male">male</option>
                            <option value="unknown">unknown</option>
                        </select>
                    </div>
                    <div class="flex justify-end gap-3">
                        <button type="button" @click="goEdit(false, 0)" v-if="!newAuthor" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go form - Add new author</button>
                        <button type="button" @click="updateAuthor()" v-if="!newAuthor" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                        <button type="button" @click="createAuthor()" v-if="newAuthor" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create new author</button>
                    </div>
                  </form>
            </div>
    
            <div class="flex-1">
                <div class="overflow-x-auto relative">
                    <p class="text-center mb-3 text-xl font-bold">Authors info</p>
                    <table class="w-full text-sm border-2 border-black-600 text-gray-500 text-center dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Age
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Genre
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="author in authorStore.authors" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ author.name }}
                                </th>
                                <td class="py-4 px-6">
                                    {{ author.age }}
                                </td>
                                <td class="py-4 px-6">
                                    {{ author.genre }}
                                </td>
                                <td class="py-4 px-6">
                                    <div class="flex flex-col">
                                        <button type="button" @click="goEdit(true, author.id)" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                        <button type="button" @click="deleteAuthor(author.id)" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
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