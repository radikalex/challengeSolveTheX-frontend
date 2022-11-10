<script setup lang="ts">
    import router  from '../router/index';
    import { useUserStore } from '../store/user';
    import { ref, onBeforeMount } from 'vue';

    let autenticated = ref(false)
    const userStore = useUserStore();

    onBeforeMount(async () => {
        const token: string | null = localStorage.getItem('user_token');

        if(token) {
            autenticated.value = true
            userStore.getLoggedUser();
        } else {
            autenticated.value = false
        }
    })

    function displayUserOptions() {
        const div: HTMLElement | null = document.getElementById("user-info");
        const content = div!.nextElementSibling;
        
        // const img = document.getElementById('arrow-options');

        if (content!.style.maxHeight) {
            // img.src = "./assets/arrow-down.png";
            content!.style.maxHeight = null;
        } else {
            // img.src = "./assets/arrow-up.png";
            content!.style.maxHeight = content!.scrollHeight + "px";
        }
    }

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
        <div class="container flex flex-wrap justify-between items-stretch mx-auto">
        <a href="https://flowbite.com/" class="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <div v-if="!autenticated" class="flex md:order-2 gap-2">
            <button @click="goSignUp()" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
            <button @click="goLogIn()" type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log In</button>
        </div>
        <div v-else class="flex md:order-2 gap-2 items-center user-data">
            <div id="user-info" class="user-info flex items-center gap-2" @click="displayUserOptions()">
                <img  class="user-icon" src="../assets/user-icon.png" alt="User Icon">
                <span class="items-center username">{{userStore.loggedUser?.name}}</span>
            </div>
            <div class="user-options">
                <span>Log Out</span>
            </div>
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

    .user-icon {
        width: 30px;
    }

    .username {
        font-size: 20px;
    }

    .user-data {
        position: relative;
    }

    .user-options {
        margin-top: 10px;
        border: 2px solid black;
        border-radius: 10px;
        position: absolute;
        width: 100%;
        display: flex;
        bottom: 5px;
        flex-direction: column;
        overflow: hidden;
        max-height: 0;
        background-color: white;
        transition: max-height 0.5s ease-out;
        z-index: 990;
    }
      
    .user-options span {
        padding: 10px 20px;
        font-size: 14px;
        cursor: pointer;
    }

    .user-info {
        cursor: pointer;
    }

</style>