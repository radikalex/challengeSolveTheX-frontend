<script setup lang="ts">
    import router  from '../router/index';
    const navLinks = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Books",
            path: "/books"
        },
        {
            name: "About us",
            path: "/about"
        },
    ];

    const goSignUp = () => {
        router.push('/signup')
    }

    const goLogIn = () => {
        router.push('/login')
    }

</script>

<template>
    <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com/" class="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <div class="flex md:order-2 gap-2">
            <button @click="goSignUp()" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
            <button @click="goLogIn()" type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log In</button>
        </div>
        <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li v-for="navLink in navLinks">
                <router-link :to="navLink.path">{{ navLink.name }}</router-link>
            </li>
          </ul>
        </div>
        </div>
    </nav>
    
</template>

<style scoped>
    li a {
        font-size: 24px;
    }
</style>