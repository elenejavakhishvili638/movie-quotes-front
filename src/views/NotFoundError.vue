<script setup>
import { RouterLink } from 'vue-router'
import ghost from '../assets/images/ghost.png'
</script>

<template>
  <div class="h-[100vh] text-white flex flex-col gap-8 items-center justify-center">
    <img :src="ghost" />
    <h1 class="font-[700] text-2xl md:text-5xl">Whoops!</h1>
    <p class="text-center text-base font-[500] md:text-2xl">
      We can't see the page you are looking for
    </p>
    <RouterLink :to="{ name: 'home' }" class="bg-[#E31221] py-0.5 px-0.75 rounded md:text-xl"
      >Return home</RouterLink
    >
  </div>
</template>
