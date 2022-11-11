<script lang="ts" setup>

</script>

<template>

    <div class="home-container">
        <div class="flex justify-center items-center home">
            <p><b>Reminder:</b> You have to be logged in to see the content of the page. You can log in <router-link class="here" to="/login">here</router-link>.</p>
        </div>
    </div>

</template>

<style scoped>
    .home-container {
        height: 94vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url(../assets/books_home.jpg);
        opacity: 1;
    }

    .home {
        background-color: whitesmoke;
        border-radius: 20px;
        width: 50vw;
        padding: 12vh 5vw;
    }

    .home p {
        font-size: 26px;
    }

    .here {
        color: blue;
        text-decoration: underline;
    }

</style>