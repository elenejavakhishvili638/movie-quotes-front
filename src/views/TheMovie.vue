<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '../stores/movies/index'
import FeedHeader from '../components/FeedHeader.vue'
import { useLanguageStore } from '../stores/language/index'
import comment from '../assets/images/logos/comment.png'
import heart from '../assets/images/logos/heart.png'
import dots from '../assets/images/logos/dots.png'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import trash from '../assets/images/logos/trash.png'
import pencil from '../assets/images/logos/pencil.png'
import eye from '../assets/images/logos/eye.png'
import EditMovie from '../components/EditMovie.vue'
import { useUserStore } from '../stores/user/index'
import AddQuote from '../components/AddQuote.vue'
import { useQuotesStore } from '../stores/quotes'
import ViewQuote from '../components/ViewQuote.vue'
import ModalLayout from '../components/ModalLayout.vue'
import EditQuote from '../components/EditQuote.vue'
import plus from '../assets/images/logos/plus.png'

const moviesStore = useMoviesStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const quoteStore = useQuotesStore()
const languageStore = useLanguageStore()
const movie = computed(() => moviesStore.$state.movie)
let path = import.meta.env.VITE_BACKEND_URL

const openedModalId = ref(null)
const editMovie = ref(false)
const addQuote = ref(false)
const viewQuote = ref(false)
const quoteId = ref(null)
const editQuote = ref(false)

onMounted(async () => {
  const id = route.params.id
  try {
    await moviesStore.fetchMovie(id)
    console.log(movie.value)
  } catch (error) {
    console.log(error)
  }
})

const openMovie = () => {
  editMovie.value = true
}
const closeMovie = () => {
  editMovie.value = false
}

const openQuote = () => {
  addQuote.value = true
}
const closeQuote = () => {
  addQuote.value = false
}

const openViewQuote = (id) => {
  viewQuote.value = true
  quoteId.value = id
}

const closeViewQuote = () => {
  viewQuote.value = false
}

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
  editQuote.value = true
  quoteId.value = id
}

const closeEditQuote = () => {
  editQuote.value = false
}

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
  <div class="background min-h-[200vh] pb-[32px]">
    <ModalLayout v-if="editMovie">
      <EditMovie :username="user.username" :movie="movie" :closeMovie="closeMovie"></EditMovie>
    </ModalLayout>
    <ModalLayout v-if="addQuote">
      <AddQuote :closeQuote="closeQuote" :username="user.username" :movie="movie"></AddQuote>
    </ModalLayout>
    <ModalLayout v-if="viewQuote">
      <ViewQuote
        @editQuote="openEditQuote"
        :closeViewQuote="closeViewQuote"
        :id="quoteId"
        :movie="movie"
      ></ViewQuote>
    </ModalLayout>
    <ModalLayout v-if="editQuote">
      <EditQuote :closeEditQuote="closeEditQuote" :id="quoteId"></EditQuote>
    </ModalLayout>
    <feed-header :searchBar="false"></feed-header>
    <div class="md:flex md:ml-[40px] lg:ml[70px]">
      <div class="hidden md:block text-white sm:w-[25%] lg:w-[17%]">
        <profile-sidebar></profile-sidebar>
      </div>
      <div class="flex flex-col mt-[39px] text-white">
        <h1 class="hidden md:block text-[24px] font-[500] mb-[33px] ml-[35px]">
          {{ $t('movie.movie_desc') }}
        </h1>
        <div class="mx-[35px] pb-[32px] md:flex md:gap-[21px]">
          <div>
            <img
              :src="path + '/storage/' + movie.image"
              class="w-[358px] h-[302px] border border-[#DDCCAA] xl:w-[809px] xl:h-[441px] rounded-[12px] object-contain mb-[24px]"
            />
          </div>
          <div class="lg:min-w-[590px]">
            <div class="flex flex-col md:flex-row justify-between">
              <h1 class="text-[#DDCCAA] text-[24px] font-[700] md:max-w-[290px] mb-[10px]">
                {{ movie.title && movie.title[language] }}
                ({{ movie.year }})
              </h1>
              <div
                class="w-[144px] h-[40px] bg-[#24222F] rounded-[10px] flex items-center justify-between px-[27px]"
              >
                <img :src="pencil" @click="openMovie" />
                <div class="border-r border-r-[#6C757D] h-[16px]"></div>
                <img :src="trash" @click="deleteMovie" />
              </div>
            </div>
            <div class="flex gap-[8px] my-[24px]">
              <div
                class="px-[11px] py-[6px] bg-[#6C757D] rounded-[4px]"
                v-for="genre in movie.genres"
                :key="genre.id"
              >
                <p class="font-[700] text-[18px]">{{ genre.name }}</p>
              </div>
            </div>
            <p class="mb-[20px] text-[#CED4DA] text-[18px] font-[700]">
              {{ $t('movie.director') }}:
              <span class="text-white font-[500]">{{
                movie.director && movie.director[language]
              }}</span>
            </p>
            <p class="font-normal text-[18px] text-[#CED4DA]">
              {{ movie.description && movie.description[language] }}
            </p>
          </div>
        </div>
        <div class="md:flex md:mb-[40px] items-center">
          <button
            class="mx-[35px] mb-[32px] md:mb-[0px] w-[140px] h-[38px] rounded-[4px] bg-red flex items-center justify-center"
            @click="openQuote"
          >
            <img :src="plus" class="pr-2" /> {{ $t('movie.add_quote') }}
          </button>
          <hr class="mx-[35px] md:hidden" />
          <div
            class="md:flex md:items-center md:border-l md:border-l-[#6C757D] md:pl-[16px] mx-[35px] mb-[35px] mt-[40px] md:mx-[0px] md:mb-[0px] md:mt-[0]"
          >
            <p class="text-[24px] md:ml-[10px]">
              {{ $t('movie.all_quotes') }} ({{ movie.quotes && movie.quotes.length }})
            </p>
          </div>
        </div>
        <div v-if="!editMovie && !addQuote && !viewQuote && !editQuote">
          <div
            v-for="(quote, index) in movie.quotes"
            :key="quote.id"
            class="relative md:w-[600px] lg:w-[809px] bg-[#11101A] flex flex-col items-center px-[35px] mb-[37px] md:ml-[35px]"
          >
            <div
              class="relative border-b border-b-[#54535A] pb-[24px] mb-[19px] flex flex-col md:flex-row items-center md:w-full"
            >
              <img
                :src="path + '/storage/' + quote.image"
                class="md:mr-[34px] md:w-[226px] h-[140px] w-[359px] mt-[20px] mb-[24px] rounded-[2px] object-cover"
              />
              <p class="italic text-[24px] text-center md:text-left">
                "{{ quote.body && quote.body[language] }}"
              </p>
              <img
                class="hidden xl:block md:absolute right-0 top-6"
                :src="dots"
                @click="openModal(index)"
              />
            </div>
            <div
              v-if="index === openedModalId"
              @click="closeModal(index)"
              class="absolute xl:top-[50px] xl:right-[-190px] right-[20px] top-5 h-[200px] w-[250px] rounded-[10px] bg-[#24222F] py-[32px] pl-[40px]"
            >
              <p class="flex gap-[10px] mb-[32px]">
                <img :src="eye" @click="openViewQuote(quote.id)" /> Vue Quote
              </p>
              <p class="flex gap-[10px] mb-[32px]">
                <img :src="pencil" @click="openEditQuote(quote.id)" /> Edit
              </p>
              <p class="flex gap-[10px] mb-[32px]">
                <img :src="trash" @click="deleteQuote(quote.id)" /> Delete
              </p>
            </div>
            <div class="flex justify-between items-center w-full mb-[20px]">
              <div class="flex">
                <div class="flex mr-[24px]">
                  <p>{{ quote.comments && quote.comments.length }}</p>
                  <img class="ml-[12px]" :src="comment" />
                </div>
                <div class="flex">
                  <p>{{ quote.likes && quote.likes.length }}</p>
                  <img class="ml-[12px]" :src="heart" />
                </div>
              </div>
              <img class="xl:hidden" :src="dots" @click="openModal(index)" />
            </div>
          </div>
          <div></div>
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
