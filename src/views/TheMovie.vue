<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/movies/index'
import FeedHeader from '@/components/FeedHeader.vue'
import { useLanguageStore } from '@/stores/language/index'
import IconComment from '@/components/icons/IconComment.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconDots from '@/components/icons/IconDots.vue'
import ProfileSidebar from '@/components/ProfileSidebar.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEditVue from '@/components/icons/IconEdit.vue'
import IconEye from '@/components/icons/IconEye.vue'
import EditMovie from '@/components/EditMovie.vue'
import { useUserStore } from '@/stores/user/index'
import AddQuote from '@/components/AddQuote.vue'
import { useQuotesStore } from '@/stores/quotes'
import ViewQuote from '@/components/ViewQuote.vue'
import ModalLayout from '@/components/ModalLayout.vue'
import EditQuote from '@/components/EditQuote.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { useNotificationStore } from '@/stores/notification'

const moviesStore = useMoviesStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const quoteStore = useQuotesStore()
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const movie = computed(() => moviesStore.$state.movie)
let path = import.meta.env.VITE_BACKEND_URL

const openedModalId = ref(null)
const quoteId = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    await moviesStore.fetchMovie(id)
  } catch (error) {
    console.log(error)
  }
})

const openMovie = () => {
  router.push({ name: 'editMovie' })
}
const closeMovie = () => {
  router.back()
}
const editMovie = computed(() => route.path === `/movie/${route.params.id}/edit-movie`)

const openQuote = () => {
  router.push({ name: 'addQuote' })
}
const closeQuote = () => {
  router.back()
}
const addQuote = computed(() => route.path === `/movie/${route.params.id}/add-quote`)

const openViewQuote = (id) => {
  router.push({
    name: 'viewQuote',
    params: { id: route.params.id },
    query: { quoteId: id }
  })
  quoteId.value = id
}

const closeViewQuote = () => {
  router.back()
}
const viewQuote = computed(() => route.path === `/movie/${route.params.id}/view-quote`)

const openModal = (id) => {
  if (openedModalId.value === id) {
    openedModalId.value = null
  } else {
    openedModalId.value = id
  }
}

const closeModal = () => {
  openedModalId.value = null
}

const openEditQuote = (id) => {
  quoteId.value = id
}

const closeEditQuote = () => {
  router.back()
}

const editQuote = computed(() => route.path === `/movie/${route.params.id}/edit-quote`)

const deleteMovie = async () => {
  const id = route.params.id
  try {
    await moviesStore.deleteMovie(id)
    await moviesStore.fetchFullList()
    router.push({ name: 'movies' })
  } catch (err) {
    console.log(err)
  }
}

const deleteQuote = async (id) => {
  try {
    await quoteStore.deleteQuote(id)
    const movieId = route.params.id
    await moviesStore.updateMovie(movieId)
  } catch (err) {
    console.log(err)
  }
}

const language = computed(() => languageStore.currentLanguage)
const user = computed(() => userStore.$state.user)
</script>

<template>
  <div class="background min-h-screen pb-2">
    <ModalLayout v-if="editMovie">
      <EditMovie
        :username="user.username"
        :image="user.image"
        :movie="movie"
        :closeMovie="closeMovie"
      ></EditMovie>
    </ModalLayout>
    <ModalLayout v-if="addQuote">
      <AddQuote
        :closeQuote="closeQuote"
        :image="user.image"
        :username="user.username"
        :movie="movie"
      ></AddQuote>
    </ModalLayout>
    <ModalLayout v-if="viewQuote">
      <ViewQuote
        @editQuote="openEditQuote"
        :closeViewQuote="closeViewQuote"
        :id="quoteId"
        :movie="movie"
        :image="user.image"
        :username="user.username"
      ></ViewQuote>
    </ModalLayout>
    <ModalLayout v-if="editQuote">
      <EditQuote
        :username="user.username"
        :image="user.image"
        :closeEditQuote="closeEditQuote"
        :id="quoteId"
      ></EditQuote>
    </ModalLayout>
    <feed-header :searchBar="false"></feed-header>
    <div class="md:flex md:ml-2.5 2xl:ml-4.5 gap-10">
      <div class="hidden md:block text-white sm:w-[25%] lg:w-[17%]">
        <profile-sidebar></profile-sidebar>
      </div>
      <div class="flex flex-col mt-2.25 text-white">
        <h1 class="hidden md:block text-2xl font-[500] mb-2 ml-2">
          {{ $t('movie.movie_desc') }}
        </h1>
        <div class="mx-2.25 pb-2 xl:flex md:gap-5">
          <div>
            <img
              :src="path + '/storage/' + movie.image"
              class="min-w-[22.375rem] w-full h-18.875 border border-[#DDCCAA] xl:w-50.563 xl:h-27.563 rounded-xl object-cover mb-1.5"
            />
          </div>
          <div class="lg:w-[36rem]">
            <div class="flex flex-col 2xl:flex-row justify-between">
              <h1 class="text-[#DDCCAA] text-2xl font-[700] md:max-w-18.125 mb-[1.25rem]">
                {{ movie.title && movie.title[language] }}
                ({{ movie.year }})
              </h1>
              <div
                class="w-[9rem] h-10 bg-[#24222F] rounded-lg flex items-center justify-between px-[1.688rem]"
              >
                <IconEditVue @click="openMovie" class="cursor-pointer"></IconEditVue>
                <div class="border-r border-r-[#6C757D] h-4"></div>
                <IconTrash @click="deleteMovie" class="cursor-pointer"></IconTrash>
              </div>
            </div>
            <div class="flex gap-2 my-1.5 flex-wrap">
              <div
                class="px-[0.688rem] py-[0.375rem] bg-[#6C757D] rounded"
                v-for="genre in movie.genres"
                :key="genre.id"
              >
                <p class="font-[700] text-lg">{{ genre.name[language] }}</p>
              </div>
            </div>
            <p class="mb-1.25 text-[#CED4DA] text-lg font-[700]">
              {{ $t('movie.director') }}:
              <span class="text-white font-[500]">{{
                movie.director && movie.director[language]
              }}</span>
            </p>
            <p class="font-normal text-lg text-[#CED4DA]">
              {{ movie.description && movie.description[language] }}
            </p>
          </div>
        </div>
        <div class="md:flex md:mb-2.5 items-center">
          <button
            :class="language === 'ka' ? 'w-12' : ' w-8.75'"
            class="mx-2.25 mb-2 md:mb-[0px] h-[2.375rem] rounded bg-red flex items-center justify-center cursor-pointer"
            @click="openQuote"
          >
            <IconPlus class="mr-1"></IconPlus>
            {{ $t('movie.add_quote') }}
          </button>
          <hr class="mx-2 md:hidden" />
          <div
            class="md:flex md:items-center md:border-l md:border-l-[#6C757D] md:pl-[1rem] mx-2 mb-2 mt-2.5 md:mx-[0px] md:mb-[0px] md:mt-[0]"
          >
            <p class="text-2xl md:ml-[0.625rem]">
              {{ $t('movie.all_quotes') }} ({{ movie.quotes && movie.quotes.length }})
            </p>
          </div>
        </div>
        <div
          v-if="
            !editMovie &&
            !addQuote &&
            !viewQuote &&
            !editQuote &&
            !notificationStore.notificationOpen
          "
        >
          <div
            v-for="(quote, index) in movie.quotes"
            :key="quote.id"
            class="relative md:w-37.5 2xl:w-50.563 bg-[#11101A] flex flex-col items-center px-2.188 mb-2.25 md:ml-2.25"
          >
            <div
              class="relative border-b border-b-[#54535A] pb-[2.625rem] mb-[1.188rem] flex flex-col md:flex-row items-center md:w-full"
            >
              <img
                :src="path + '/storage/' + quote.image"
                class="md:mr-2 md:w-[14.125rem] h-8.75 w-22.438 mt-[1.25rem] mb-1.5 rounded object-cover"
              />
              <p class="italic text-2xl text-center md:text-left">
                "{{ quote.body && quote.body[language] }}"
              </p>
              <IconDots
                class="hidden xl:block md:absolute right-0 top-6 cursor-pointer"
                @click="openModal(index)"
              ></IconDots>
            </div>
            <div
              v-if="index === openedModalId"
              @click="closeModal(index)"
              class="absolute xl:top-[3.125rem] xl:right-[-11.875rem] right-[1.25rem] top-5 h-12.5 w-[15.625rem] rounded-lg bg-[#24222F] py-2 pl-[2.5rem]"
            >
              <p
                @click="openViewQuote(quote.id)"
                class="flex gap-2 mb-2 items-center cursor-pointer"
              >
                <IconEye></IconEye>
                {{ $t('movie.view_quote') }}
              </p>
              <p
                @click="openEditQuote(quote.id)"
                class="flex gap-2 mb-2 items-center cursor-pointer"
              >
                <IconEditVue></IconEditVue>
                {{ $t('movie.edit') }}
              </p>
              <p @click="deleteQuote(quote.id)" class="flex gap-2 mb-2 items-center cursor-pointer">
                <IconTrash></IconTrash>
                {{ $t('movie.delete') }}
              </p>
            </div>
            <div class="flex justify-between items-center w-full mb-[1.25rem]">
              <div class="flex">
                <div class="flex mr-1.5">
                  <p>{{ quote.comments && quote.comments.length }}</p>
                  <IconComment class="ml-0.75"></IconComment>
                </div>
                <div class="flex">
                  <p>{{ quote.likes && quote.likes.length }}</p>
                  <IconHeart class="ml-0.75" :filled-color="'white'"></IconHeart>
                </div>
              </div>
              <IconDots class="xl:hidden cursor-pointer" @click="openModal(index)"></IconDots>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
