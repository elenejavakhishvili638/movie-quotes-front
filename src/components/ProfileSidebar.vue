<script setup>
import home from '../assets/images/logos/home.png'
import movie from '../assets/images/logos/movie.png'
import activeHouse from '../assets/images/logos/activeHouse.png'
import activeCamera from '../assets/images/logos/activeCamera.png'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user/index'
import { computed } from 'vue'

const props = defineProps(['close'])

const userStore = useUserStore()

const route = useRoute()

const homeImage = computed(() => (route.path === '/news-feed' ? activeHouse : home))
const movieImage = computed(() => (route.path === '/movie-list' ? activeCamera : movie))

const user = computed(() => userStore.$state.user)
</script>

<template>
  <div class="sticky top-[120px]">
    <div class="flex items-center mb-[14px] mt-[32px]">
      <img
        class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
        :src="user.image"
        alt="name"
      />
      <div class="flex flex-col ml-[16px]">
        <p class="text-[24px]">{{ user.username }}</p>
        <router-link :to="{ name: 'profile' }">{{ $t('feed.edit_profile') }}</router-link>
      </div>
    </div>
    <div class="mt-[40px] text-[24px]">
      <div class="flex items-center mb-[40px] gap-[30px]" @click="props.close">
        <img :src="homeImage" />
        <router-link :to="{ name: 'feed' }">{{ $t('feed.news_feed') }}</router-link>
      </div>
      <div class="flex items-center gap-[30px] mb-1" @click="props.close">
        <img :src="movieImage" />
        <router-link :to="{ name: 'movies' }">{{ $t('feed.movie_list') }}</router-link>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
