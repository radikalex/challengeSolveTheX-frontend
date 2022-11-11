<script setup lang="ts">
    import router  from '../router/index';
    import { useUserStore } from '../store/user';
    import { useBookStore } from '../store/book';
    import { ref, onBeforeMount } from 'vue';

    let autenticated = ref(false)
    const userStore = useUserStore();
    const bookStore = useBookStore();


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
        const div = document.getElementById("user-info") as HTMLElement;;
        const content = div!.nextElementSibling as HTMLElement;
        const img = document.getElementById('arrow-options') as HTMLImageElement;
        
        
        if(content != null) {
            if (content!.style.maxHeight) {
                img.src = "/src/assets/arrow-down.png";
                content!.style.maxHeight = '';
            } else {
                img.src = "/src/assets/arrow-up.png";
                content!.style.maxHeight = content!.scrollHeight + "px";
            }
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
        }
    ];

    const goSignUp = () => {
        router.push('/signup')
    }

    const goLogIn = () => {
        router.push('/login')
    }

    const goAdmin = () => {
        router.push('/admin')
    }

    const goMyOrders = () => {
        displayUserOptions();
        router.push('/my_orders')
    }

    const goCart = () => {
        router.push('/cart')
    }

    const logOut = async () => {
        await userStore.logOut();
        localStorage.removeItem('user_token');
        userStore.incUpdateRender();
        router.push('/')
    }

</script>

<template>
    <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 navBar">
        <div class="container flex flex-wrap justify-between items-stretch mx-auto">
        <a href="#" class="flex items-center">
            <img src="../assets/book-logo.png" class="h-12" alt="Books Shop Logo">
            <span class="self-center text-xl font-semibold whitespace-nowrap text-white">Book Shop</span>
        </a>
        <div v-if="!autenticated" class="flex md:order-2 gap-2">
            <button @click="goSignUp()" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
            <button @click="goLogIn()" type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log In</button>
        </div>
        <div v-else class="flex md:order-2 gap-2 items-center">
            <div v-if="userStore.loggedUser?.role === 'admin'" class="admin">
                <button type="button" @click="goAdmin()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Admin Page</button>
            </div>
            <div class="user-data">
                <div id="user-info" class="user-info flex items-center gap-2 justify-between" @click="displayUserOptions()">
                    <img  class="user-icon" src="../assets/user-icon.png" alt="User Icon">
                    <span class="items-center username">{{userStore.loggedUser?.name}}</span>
                    <img src="../assets/arrow-down.png" class="arrow-options" id="arrow-options">
                </div>
                <div class="user-options">
                    <span @click="goMyOrders()">My Orders</span>
                    <span @click="logOut()">Log Out</span>
                </div>
            </div>
            <div class="cart-area" @click="goCart()">
                <span class="num-products" id="num-products">{{ bookStore.getNumberBooksCart() }}</span>
                <img src="../assets/cart-icon.png" class="cart-img">
            </div>
        </div>
        <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul class="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
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
        font-size: 20px;
        color: white;
    }

    li a:hover {
        color: rgb(175, 111, 202);
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
        border: 1px solid rgba(0, 0, 0, 0.478);
        border-radius: 5px;
        position: absolute;
        width: 100%;
        top: 25px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        max-height: 0;
        background-color: white;
        transition: max-height 0.5s ease-out;
        z-index: 990;
    }
      
    .user-options span {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    .user-options span:hover {
        background-color: rgb(226, 217, 217);
    }

    .user-info {
        cursor: pointer;
        color: white;
        min-width: 150px;
    }

    .navBar {
        background-color: black;
    }

    .arrow-options {
        width: 25px;
    }

    .cart-img {
        width: 25px;
    }

    .num-products {
        background-color: red;
        color: white;
        font-weight: 400;
        position: absolute;
        height: 18px;
        width: 18px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0px;
        top: 5px;
    }

    .cart-area {
        position: relative;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      

</style>