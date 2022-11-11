<script lang="ts">
import { defineComponent } from 'vue';
import { useBookStore } from '../store/book';
import { useUserStore } from '../store/user';
import { onBeforeMount, ref } from 'vue'
import AuthorAdmin from '../components/AuthorAdmin.vue'
import BooksAdmin from '../components/BooksAdmin.vue'
import OrderAdmin from '../components/OrderAdmin.vue'
import UserAdmin from '../components/UserAdmin.vue'

export default defineComponent({
    components: {
        AuthorAdmin,
        BooksAdmin,
        OrderAdmin,
        UserAdmin
    },

    setup() {
        const admin_page = ref(0);
        const admin_pageName = ref('Books')
        const numberAdminPages = 4;

        onBeforeMount(() => {
            
        })

        const switchPageName = () => {
            switch(admin_page.value) {
                case 0:
                    admin_pageName.value = "Books";
                    break;
                case 1:
                    admin_pageName.value = "Authors";
                    break;
                case 2:
                    admin_pageName.value = "Users";
                    break;
                case 3:
                    admin_pageName.value = "Orders";
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
        <div class="flex gap-20 justify-center items-center my-10">
            <img @click="previousPage()" src="../assets/left-arrow.png" alt="Left Arrow" class="admin-arrows">
            <h1 class="font-bold text-5xl text-center">Admin View: {{ admin_pageName }} </h1>
            <img @click="nextPage()" src="../assets/right-arrow.png" alt="Right Arrow" class="admin-arrows">
        </div>

        <BooksAdmin v-if="admin_page === 0" />
        <AuthorAdmin v-if="admin_page === 1" />
        <UserAdmin v-if="admin_page === 2" />
        <OrderAdmin v-if="admin_page === 3" />

    </div>

</template>

<style scoped>
    .admin-arrows {
        width: 70px;
        height: 40px;
        cursor: pointer;
    }
</style>