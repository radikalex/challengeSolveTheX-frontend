<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import NavBar from './shared/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>

  <main>
    <router-view></router-view>
  </main>

</template>

<style scoped>
</style>
