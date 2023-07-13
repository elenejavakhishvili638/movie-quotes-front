<script setup>
import FeedHeader from '@/components/FeedHeader.vue'
import IconChatQuote from '@/components/icons/IconChatQuote.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { onMounted, computed, ref } from 'vue'
import { useMoviesStore } from '@/stores/movies/index'
import { useLanguageStore } from '@/stores/language/index'
import ProfileSidebar from '@/components/ProfileSidebar.vue'
import { useUserStore } from '@/stores/user/index'
import NewMovie from '@/components/NewMovie.vue'
import ModalLayout from '@/components/ModalLayout.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { useRouter, useRoute } from 'vue-router'

const moviesStore = useMoviesStore()
const languageStore = useLanguageStore()
const searchTerm = ref('')
const userStore = useUserStore()
const searchOpen = ref(false)
const router = useRouter()
const route = useRoute()
let path = import.meta.env.VITE_BACKEND_URL

onMounted(async () => {
  await moviesStore.fetchFullList()
})

const fetchMovies = async () => {
  if (searchTerm.value) {
    await moviesStore.filterMovies(searchTerm.value)
  } else {
    await moviesStore.fetchFullList()
  }
}

const openMovie = () => {
  router.push({ name: 'newMovie' })
}
const closeMovie = () => {
  router.back()
}

const addMovie = computed(() => route.name === 'newMovie')

const language = computed(() => languageStore.currentLanguage)
const user = computed(() => userStore.$state.user)

const toggleSearch = () => {
  searchOpen.value = true
}

const closeSearch = () => {
  searchOpen.value = false
}
</script>

<template>
  <div class="background min-h-screen pb-2">
    <modal-layout v-if="addMovie">
      <new-movie :image="user.image" :username="user.username" :closeMovie="closeMovie"></new-movie>
    </modal-layout>
    <feed-header :searchBar="true" :toggle-search="toggleSearch"></feed-header>
    <div class="md:flex ml-2.5 xl:ml-4.5">
      <div class="hidden md:block text-white w-14.5">
        <profile-sidebar></profile-sidebar>
      </div>
      <div class="mx-2 md:mr-4.5 text-white flex flex-col justify-start mt-2 md:w-[75%] md:ml-8">
        <div class="flex justify-between mb-2">
          <div class="text-white mb-2">
            <h1 class="text-2xl">{{ $t('movie.my_list') }}</h1>
            <p>{{ $t('movie.total') }} ({{ moviesStore.totalMovies }})</p>
          </div>
          <div class="flex items-center">
            <div class="mr-2 hidden md:flex md:ml-1.5">
              <IconSearch class="mr-1 cursor-pointer"></IconSearch>
              <input
                v-model="searchTerm"
                @input="fetchMovies"
                :placeholder="$t('feed.search')"
                class="bg-transparent outline-none w-5.6"
              />
            </div>
            <button
              :class="language === 'ka' ? 'w-12' : ' w-8.75'"
              class="h-2.6 rounded bg-red flex items-center justify-center cursor-pointer"
              @click="openMovie"
            >
              <IconPlus class="mr-0.25"></IconPlus>
              {{ $t('movie.add_movie') }}
            </button>
          </div>
        </div>
        <div
          v-if="searchOpen"
          class="absolute top-0 left-0 h-48.5 bg-[#12101A] w-full text-white md:hidden"
        >
          <div class="border-b border-[#EFEFEF]">
            <div class="my-1.5 ml-2 flex items-center">
              <icon-arrow @click="closeSearch" class="mr-1.5 cursor-pointer"></icon-arrow>
              <input
                :placeholder="$t('feed.search')"
                v-model="searchTerm"
                @input="fetchMovies"
                class="bg-transparent outline-none"
              />
            </div>
          </div>
        </div>
        <div class="text-white grid gap-12 md:grid-cols-fill">
          <div v-for="movie in moviesStore.filteredMovieList" :key="movie.id">
            <div v-if="movie.id">
              <router-link :to="{ name: 'movie', params: { id: movie.id } }">
                <img
                  alt="movie"
                  :src="path + '/storage/' + movie.image"
                  class="sm:w-22 md:w-27 h-19 rounded-xl object-cover border border-[#DDCCAA]"
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
