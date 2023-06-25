<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user/index'
import { computed, ref } from 'vue'
import ProfileCamera from './icons/ProfileCamera.vue'
import ProfileHome from './icons/ProfileHome.vue'


const props = defineProps(['close'])
let path = import.meta.env.VITE_BACKEND_URL

const userStore = useUserStore()

const route = useRoute()

const homeImage = computed(() => (route.path === '/news-feed' ? 'red' : 'white'))
const movieImage = computed(() => (route.path === '/movie-list' ? 'red' : 'white'))
const profile = computed(() => (route.path === '/my-profile' ? 'border border-[#E31221]' : null))

const user = computed(() => userStore.$state.user)
const uploadedImageUrl = ref(
  user.value.image &&  user.value.image.startsWith('images') 
    ? path + '/storage/' + user.value.image 
    : user.value.image
);
</script>

<template>
  <div class="sticky top-[7.5rem]">
    <div class="flex items-center mb-1 mt-2">
      <img
        :class="profile"
        class="bg-[#D9D9D9] rounded-full w-10 h-10 lg:w-3.75 lg:w- lg:h-3.75 object-cover"
        :src="uploadedImageUrl"
        alt="name"
      />
      <div class="flex flex-col ml-1">
        <p class="text-2xl">{{ user.username }}</p>
        <router-link class="text-[#CED4DA] hover:text-[#FFFFFF]" :to="{ name: 'profile' }">{{
          $t('feed.edit_profile')
        }}</router-link>
      </div>
    </div>
    <div class=" mt-2.5 text-2xl">
      <div class="flex items-center mb-2.5 gap-8" @click="props.close">
        <ProfileHome :filled-color="homeImage" ></ProfileHome>
        <router-link :to="{ name: 'feed' }">{{ $t('feed.news_feed') }}</router-link>
      </div>
      <div class="flex items-center gap-8 mb-1" @click="props.close">
        <ProfileCamera :filled-color="movieImage" ></ProfileCamera>
        <router-link :to="{ name: 'movies' }">{{ $t('feed.movie_list') }}</router-link>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
