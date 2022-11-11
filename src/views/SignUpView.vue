<script lang="ts" setup>
    import { ref } from 'vue'
    import router  from '../router/index';
    import { useUserStore } from '../store/user';

    const userStore = useUserStore();
    const signUpDone = ref(false);
    const name = ref('');
    const email = ref('');
    const pass1 = ref('');
    const pass2 = ref('');

    const signUp = async () => {
        const alerts_div: HTMLElement | null = document.getElementById('signUp-alerts')
        if( ! /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gm.test(email.value) ) {
            createAlert(alerts_div, "The email format is not valid", 3000, true);
            return;
        }
        if(pass1.value !== pass2.value) {
            createAlert(alerts_div, "Passwords don't match", 3000, true);
            return;
        }
        const data = await userStore.signUp(name.value, email.value, pass1.value);
        
        if(!data.ok) {
            createAlert(alerts_div, data.msg, 3000, true);
            return;
        } else {
            signUpDone.value = true;
            createAlert(alerts_div, `Welcome ${data.user.name}, you can now log in!`, 3000, false);
            setTimeout(() => {
                router.push('/')
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

    <div class="flex justify-center flex-auto">
        <div class="sign-up">
            <form  @submit.prevent="signUp">
                <h1 class="font-bold text-5xl text-center mb-5">Sign Up</h1>
                <div id="signUp-alerts"></div>
                <div class="mb-6">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your name</label>
                    <input type="text" v-model="name" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your name..." required>
                </div>

                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                    <input type="email" v-model="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required>
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                    <input type="password" v-model="pass1" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
                </div>
                <div class="mb-6">
                    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat password</label>
                    <input type="password" v-model="pass2" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
                </div>
                <div class="flex items-start mb-6">
                    <p class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Already have an account? Log in  <router-link class="here" to="/login">here</router-link>.</p>
                </div>
                <button :disabled="signUpDone" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
            </form>
        </div>
    </div>

</template>

<style scoped>
    .sign-up {
        border: 2px solid black;
        width: 60%;
        padding: 3% 5%;
        border-radius: 20px;
        height: 100%;
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