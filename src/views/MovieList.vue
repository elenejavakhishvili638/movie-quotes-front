<script setup>
import FeedHeader from '../components/FeedHeader.vue'
import com from '../assets/images/logos/com.png'
import search from '../assets/images/logos/search.png'
import { onMounted, computed, ref, watch } from 'vue'
import { useMoviesStore } from '../stores/movies/index'
import { useLanguageStore } from '../stores/language/index'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import { useUserStore } from '../stores/user/index'
import NewMovie from '../components/NewMovie.vue'

const moviesStore = useMoviesStore()
const languageStore = useLanguageStore()
const searchTerm = ref('')
const userStore = useUserStore()
const addMovie = ref(false)
let path = import.meta.env.VITE_BACKEND_URL

onMounted(async () => {
  await moviesStore.fetchMovies()
})

const fetchMovies = async () => {
  if (searchTerm.value) {
    await moviesStore.fetchMovies(searchTerm.value)
  } else {
    await moviesStore.fetchFullList()
  }
}

watch(searchTerm, (newTerm) => {
  moviesStore.fetchMovies(newTerm)
})

const openMovie = () => {
  addMovie.value = true
}
const closeMovie = () => {
  addMovie.value = false
}

// const movies = computed(() => moviesStore.movieList)

const language = computed(() => languageStore.currentLanguage)
const user = computed(() => userStore.$state.user)
</script>

<template>
  <div class="background min-h-[135vh] pb-[32px]">
    <new-movie v-if="addMovie" :username="user.username" :closeMovie="closeMovie"></new-movie>
    <feed-header :searchBar="false"></feed-header>
    <div class="md:flex md:ml-[40px] lg:ml[70px]">
      <div class="hidden md:block text-white sm:w-[25%]">
        <profile-sidebar></profile-sidebar>
      </div>
      <div
        class="mt-[17px] mx-[35px] md:mr-[70px] text-white flex flex-col justify-center md:w-[75%] md:ml-[128px]"
      >
        <div class="flex justify-between">
          <div class="text-white mb-[34px]">
            <h1 class="text-[24px]">{{ $t('movie.my_list') }}</h1>
            <p>{{ $t('movie.total') }} ({{ moviesStore.totalMovies }})</p>
          </div>
          <div class="flex items-center">
            <div class="mr-[21px] hidden md:flex md:ml-[24px]">
              <img :src="search" class="mr-[16px]" />
              <input
                v-model="searchTerm"
                @input="fetchMovies"
                :placeholder="$t('feed.search')"
                class="bg-transparent outline-none w-[91px]"
              />
            </div>
            <button class="w-[140px] h-[38px] rounded-[4px] bg-red" @click="openMovie">
              {{ $t('movie.add_movie') }}
            </button>
          </div>
        </div>
        <div class="text-white grid gap-[50px] md:grid-cols-fill">
          <div v-for="movie in moviesStore.state" :key="movie.id" class="mb-[60px]">
            <div v-if="movie.id">
              <router-link :to="{ name: 'movie', params: { id: movie.id } }">
                <img
                  alt="movie"
                  :src="path + '/storage/' + movie.image"
                  class="sm:w-[358px] md:w-[440px] h-[302px] rounded-[12px] object-contain border border-[#DDCCAA]"
                />
                <div class="mt-[16px] w-[358px]">
                  <h1 class="mb-[16px] text-[24px]">
                    {{ movie.title && movie.title[language] }} ({{ movie.year }})
                  </h1>
                  <div class="flex items-center gap-[12px]">
                    <p>10</p>
                    <img :src="com" />
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>