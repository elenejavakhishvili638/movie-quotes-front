<script setup>
import home from '../assets/images/logos/home.png'
import movie from '../assets/images/logos/movie.png'
import activeHouse from '../assets/images/logos/activeHouse.png'
import activeCamera from '../assets/images/logos/activeCamera.png'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user/index'
import { computed, ref } from 'vue'

const props = defineProps(['close'])
let path = import.meta.env.VITE_BACKEND_URL

const userStore = useUserStore()

const route = useRoute()

const homeImage = computed(() => (route.path === '/news-feed' ? activeHouse : home))
const movieImage = computed(() => (route.path === '/movie-list' ? activeCamera : movie))
const profile = computed(() => (route.path === '/my-profile' ? 'border border-[#E31221]' : null))

const user = computed(() => userStore.$state.user)
const uploadedImageUrl = ref(path + '/storage/' + user.value.image)
</script>

<template>
  <div class="sticky top-[120px]">
    <div class="flex items-center mb-[14px] mt-2">
      <img
        :class="profile"
        class="bg-[#D9D9D9] rounded-full w-10 h-10 lg:w-[60px] lg:h-[60px] object-cover"
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
    <div class="mt-[40px] text-2xl">
      <div class="flex items-center mb-[40px] gap-8" @click="props.close">
        <img :src="homeImage" />
        <router-link :to="{ name: 'feed' }">{{ $t('feed.news_feed') }}</router-link>
      </div>
      <div class="flex items-center gap-8 mb-1" @click="props.close">
        <img :src="movieImage" />
        <router-link :to="{ name: 'movies' }">{{ $t('feed.movie_list') }}</router-link>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
