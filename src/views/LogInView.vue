<script lang="ts" setup>
    import { ref } from 'vue'
    import router  from '../router/index';
    import { useUserStore } from '../store/user';
    import { useBookStore } from '../store/book';

    const userStore = useUserStore();
    const bookStore = useBookStore();
    const logInDone = ref(false);
    const email = ref('');
    const pass = ref('');

    const logIn = async () => {
        const alerts_div: HTMLElement | null = document.getElementById('logIn-alerts')
        const data = await userStore.logIn(email.value, pass.value);
        
        if(!data.ok) {
            createAlert(alerts_div, data.message, 3000, true);
            return;
        } else {
            localStorage.setItem('user_token', data.token)
            logInDone.value = true;
            createAlert(alerts_div, `Welcome ${data.user.name}!`, 3000, false);
            setTimeout(() => {
                bookStore.cart = []
                userStore.incUpdateRender();
                router.push('/books')
            }, 3000);
        }
    };

    const createAlert = (alerts_div: HTMLElement | null, message: string, time: number, error: boolean) => {

        while (alerts_div!.firstChild) {
            alerts_div!.removeChild(alerts_div!.firstChild);
        }

        const pop_alert = document.createElement('div');
        if(error)
            pop_alert.className = "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800";
        else
            pop_alert.className = "p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800";
        pop_alert.innerHTML = message;
        alerts_div!.appendChild(pop_alert);

        setTimeout(() => pop_alert.remove(), time);
    }
</script>

<template>

    <div class="container-login">
        <div class="log-in">
            <form @submit.prevent="logIn">
                <h1 class="font-bold text-5xl text-center mb-5">Log In</h1>
                <div id="logIn-alerts"></div>
                <div class="mb-6">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                  <input type="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
                </div>
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                  <input type="password" v-model="pass" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div class="flex items-start mb-6">
                  <div class="flex items-center h-5">
                    <p class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">You do not have an account? Sign up <router-link class="here" to="/signup">here</router-link>.</p>
                  </div>
                </div>
                <button type="submit" :disabled="logInDone" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    </div>

</template>

<style scoped>
.container-login {
    height: 94vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/books_home.jpg);
    opacity: 1;
}
.log-in {
    border: 2px solid black;
    width: 60%;
    padding: 3% 5%;
    border-radius: 20px;
    background-color: whitesmoke;
}

.here {
    color: blue;
    text-decoration: underline;
}

button:disabled {
    pointer-events: none;
    opacity: 0.25;
}

</style>