<script setup>
import { RouterLink } from 'vue-router'
import gandalf from '../assets/images/gandalf.png'
</script>

<template>
  <div class="h-[100vh] text-white flex flex-col gap-8 items-center justify-center">
    <img :src="gandalf" />
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

<style scoped>
div {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}

img {
  background-image: url('../assets/images/union.png');
  background-repeat: no-repeat;
  background-position: center;
}
</style>
