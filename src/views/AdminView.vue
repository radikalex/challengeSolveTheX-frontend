<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthorStore } from '../store/author';
import { useBookStore } from '../store/book';
import { onBeforeMount, ref } from 'vue'
import AuthorAdmin from '../components/AuthorAdmin.vue'
import BooksAdmin from '../components/BooksAdmin.vue'

export default defineComponent({
    components: {
        AuthorAdmin,
        BooksAdmin
    },

    setup() {
        const admin_page = ref(0);
        const admin_pageName = ref('Books');
        const numberAdminPages = 2;
        const authorStore = useAuthorStore();
        const bookStore = useBookStore();

        onBeforeMount(() => {
            authorStore.getAllAuthors();
            bookStore.getBooks();
        })

        const switchPageName = () => {
            switch(admin_page.value) {
                case 0:
                    admin_pageName.value = "Books";
                    break;
                case 1:
                    admin_pageName.value = "Authors";
                    break;
            }
        } 

        const nextPage = () => {
            admin_page.value = (admin_page.value + 1) % numberAdminPages;
            switchPageName();
        }

        const previousPage = () => {
            admin_page.value = (admin_page.value + numberAdminPages - 1) % numberAdminPages;
            switchPageName();
        }

        return {
            admin_page,
            admin_pageName,
            nextPage,
            previousPage
        };
    },
});
</script>

<template>

    <div class="flex justify-center flex-col">
        <div class="flex gap-20 justify-center items-center my-10 headerAdmin">
            <img @click="previousPage()" src="../assets/left-arrow.png" alt="Left Arrow" class="admin-arrows">
            <h1 class="font-bold text-5xl text-center">Admin View: {{ admin_pageName }} </h1>
            <img @click="nextPage()" src="../assets/right-arrow.png" alt="Right Arrow" class="admin-arrows">
        </div>

        <BooksAdmin v-if="admin_page === 0" />
        <AuthorAdmin v-if="admin_page === 1" />

    </div>

</template>

<style scoped>
    .admin-arrows {
        width: 70px;
        height: 40px;
        cursor: pointer;
    }

    .headerAdmin {
        padding-bottom: 20px;
        border-bottom: 1px dotted rgba(83, 81, 81, 0.365);
    }
</style>