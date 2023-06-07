<script setup>
import ProfileSidebar from '../components/ProfileSidebar.vue'
import FeedHeader from '../components/FeedHeader.vue'
import MyProfile from '../components/MyProfile.vue'
import BiggerProfile from '../components/BiggerProfile.vue'
import { useUserStore } from '../stores/user/index'
import { computed } from 'vue'

const userStore = useUserStore()

const user = computed(() => userStore.$state.user)
console.log(user)
</script>

<template>
  <div class="background min-h-screen pb-[32px] text-white">
    <feed-header></feed-header>
    <div class="md:flex md:ml-[40px] lg:ml[70px]">
      <div class="hidden md:block text-white sm:w-[25%]">
        <profile-sidebar></profile-sidebar>
      </div>
      <my-profile class="md:hidden" :username="user.username" :email="user.email"></my-profile>
      <bigger-profile class="hidden md:block"></bigger-profile>
    </div>
  </div>
</template>

<style scoped>
.background {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
