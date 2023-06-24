<script setup>
import ProfileSidebar from '../components/ProfileSidebar.vue'
import FeedHeader from '../components/FeedHeader.vue'
import MyProfile from '../components/MyProfile.vue'
import BiggerProfile from '../components/BiggerProfile.vue'
import { useUserStore } from '../stores/user/index'
import { computed } from 'vue'

const userStore = useUserStore()

const user = computed(() => userStore.$state.user)
</script>

<template>
  <div class="background min-h-screen pb-2 text-white">
    <feed-header></feed-header>
    <div class="md:flex md:ml-[2.5rem] lg:ml-[4.375rem]">
      <div class="hidden md:block text-white sm:w-[25%]">
        <profile-sidebar></profile-sidebar>
      </div>
      <my-profile
        class="md:hidden"
        :google="user.google_id"
        :username="user.username"
        :email="user.email"
        :user="user"
      ></my-profile>
      <bigger-profile
        class="hidden md:block"
        :google="user.google_id"
        :username="user.username"
        :email="user.email"
        :user="user"
      ></bigger-profile>
    </div>
  </div>
</template>

<style scoped>
.background {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
