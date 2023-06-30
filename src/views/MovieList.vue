<script setup>
import FeedHeader from '../components/FeedHeader.vue'
import IconChatQuote from '../components/icons/IconChatQuote.vue'
import IconSearch from '../components/icons/IconSearch.vue'
import { onMounted, computed, ref, watch } from 'vue'
import { useMoviesStore } from '../stores/movies/index'
import { useLanguageStore } from '../stores/language/index'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import { useUserStore } from '../stores/user/index'
import NewMovie from '../components/NewMovie.vue'
import ModalLayout from '../components/ModalLayout.vue'
import IconPlus from '../components/icons/IconPlus.vue'

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

const language = computed(() => languageStore.currentLanguage)
const user = computed(() => userStore.$state.user)
</script>

<template>
  <div class="background min-h-135 pb-2">
    <modal-layout v-if="addMovie">
      <new-movie :image="user.image" :username="user.username" :closeMovie="closeMovie"></new-movie>
    </modal-layout>
    <feed-header :searchBar="false"></feed-header>
    <div class="md:flex md:ml-2.5 lg:ml-4.5">
      <div class="hidden md:block text-white md:ml-2">
        <profile-sidebar></profile-sidebar>
      </div>
      <div class="mt-1 mx-2 md:mr-4.5 text-white flex flex-col justify-center md:w-[75%] md:ml-8">
        <div class="flex justify-between mb-2">
          <div class="text-white mb-2">
            <h1 class="text-2xl">{{ $t('movie.my_list') }}</h1>
            <p>{{ $t('movie.total') }} ({{ moviesStore.totalMovies }})</p>
          </div>
          <div class="flex items-center">
            <div class="mr-2 hidden md:flex md:ml-1.5">
              <IconSearch class="mr-1"></IconSearch>
              <input
                v-model="searchTerm"
                @input="fetchMovies"
                :placeholder="$t('feed.search')"
                class="bg-transparent outline-none w-5.6"
              />
            </div>
            <button
              class="w-8.75 h-2.6 rounded bg-red flex items-center justify-center cursor-pointer"
              @click="openMovie"
            >
              <IconPlus class="mr-0.25"></IconPlus>
              {{ $t('movie.add_movie') }}
            </button>
          </div>
        </div>
        <div class="text-white grid gap-12 md:grid-cols-fill">
          <div v-for="movie in moviesStore.state" :key="movie.id">
            <div v-if="movie.id">
              <router-link :to="{ name: 'movie', params: { id: movie.id } }">
                <img
                  alt="movie"
                  :src="path + '/storage/' + movie.image"
                  class="sm:w-22 md:w-27 h-19 rounded-xl object-contain border border-[#DDCCAA]"
                />
                <div class="mt-1 w-22">
                  <h1 class="mb-1 text-2xl">
                    {{ movie.title && movie.title[language] }} ({{ movie.year }})
                  </h1>
                  <div class="flex items-center gap-3">
                    <p>{{ movie.quotes && movie.quotes.length }}</p>
                    <IconChatQuote></IconChatQuote>
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
