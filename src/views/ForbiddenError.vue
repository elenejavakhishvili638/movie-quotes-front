<script setup>
import { RouterLink } from 'vue-router'
import gandalf from '../assets/images/gandalf.png'
</script>

<template>
  <div class="h-screen text-white flex flex-col gap-8 items-center justify-center">
    <img :src="gandalf" class="bg-union bg-no-repeat bg-center" />
    <h1 class="font-[700] text-2xl md:text-5xl">You shall not pass!</h1>
    <p class="text-center text-base font-[500] md:text-2xl">
      Sorry, but you don’t have permission to <br />
      access this page
    </p>
    <RouterLink :to="{ name: 'home' }" class="bg-[#E31221] px-2 py-0.75 rounded md:text-xl"
      >Return home</RouterLink
    >
  </div>
</template>
