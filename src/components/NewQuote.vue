<script setup>
import close from '../assets/images/logos/close.png'
import TheButton from '../components/TheButton.vue'
import { ref, computed, onMounted } from 'vue'
import image from '../assets/images/logos/image.png'
import movie from '../assets/images/logos/movie.png'
import dropdown from '../assets/images/logos/dropdown.png'
import { useMoviesStore } from '../stores/movies/index'
import { useLanguageStore } from '../stores/language/index'

const fileInput = ref(null)
const dropDown = ref(false)
const moviesStore = useMoviesStore()
const languageStore = useLanguageStore()
const chosenMovie = ref('Choose movie')

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = (e) => {
  console.log(e)
}

const openDropdown = () => {
  dropDown.value = !dropDown.value
}

const props = defineProps(['username', 'closeQuote'])
const movies = computed(() => moviesStore.$state.movieList)
const language = computed(() => languageStore.currentLanguage)

onMounted(async () => {
  await moviesStore.fetchMovies()
})

const selectMovie = (movie) => {
  dropDown.value = false
  chosenMovie.value = movie
  console.log(chosenMovie.value)
}
</script>

<template>
  <div
    class="h-auto top-0 w-full md:top-[8%] md:left-[35%] xl:left-[28%] 2xl:left-[24%] xl:w-[601px] 2xl:w-[961px] absolute text-white bg-[#11101A] md:w-[500px] rounded-[12px]"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-[25px] px-[54px]">
      <div></div>
      <h1>Write new quote</h1>
      <img @click="props.closeQuote" :src="close" />
    </div>
    <div class="p-[35px]">
      <div class="flex items-center gap-[16px]">
        <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        <p>{{ props.username }}</p>
      </div>
      <form class="relative flex flex-col mt-[37px] gap-[16px]">
        <div class="border border-[#6C757D] h-[86px] flex relative rounded-[4px]">
          <textarea
            class="bg-transparent outline-none w-full pl-[13px] pt-[7px]"
            rows="4"
            placeholder="Create new quote"
          ></textarea>
          <p class="absolute right-4 top-2">Eng</p>
        </div>
        <div class="border border-[#6C757D] h-[86px] flex relative rounded-[4px]">
          <textarea
            class="bg-transparent outline-none w-full pl-[13px] pt-[7px]"
            rows="4"
            placeholder="ახალი ციტატა"
          ></textarea>
          <p class="absolute right-4 top-2">ქარ</p>
        </div>

        <div
          class="flex justify-between items-center border border-[#6C757D] w-full h-[82px] rounded-[4px]"
        >
          <input
            type="file"
            id="file-input"
            ref="fileInput"
            style="display: none"
            @change="onFileChange"
          />
          <div class="flex ml-[16px]">
            <img :src="image" />
            <p class="text-[16px] font-normal ml-[13px]">Upload image</p>
          </div>
          <button
            type="button"
            class="bg-[#9747FF66] w-[101px] h-[42px] mr-[16px]"
            @click="triggerFileInput"
          >
            Choose file
          </button>
        </div>

        <div
          @click="openDropdown"
          class="bg-[#000000] w-full h-[86px] rounded-[4px] flex justify-between items-center"
        >
          <div class="flex ml-[16px]">
            <img :src="movie" />
            <p class="ml-[13px] text-base">{{ chosenMovie }}</p>
          </div>
          <img :src="dropdown" class="mr-[31px]" />
        </div>
        <div v-if="dropDown" class="text-white bg-black p-[20px] top-5 bottom-3">
          <div v-for="movie in movies" :key="movie.id" class="border-b border-b-blue-50 mb-[5px]">
            <p @click="selectMovie(movie.title[language])">
              {{ movie.title && movie.title[language] }}
            </p>
          </div>
        </div>
        <the-button class="w-full h-[48px]">Post</the-button>
      </form>
    </div>
  </div>
</template>
