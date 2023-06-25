<script setup>
import IconClose from './icons/IconClose.vue'
import TheButton from '../components/TheButton.vue'
import { ref, computed, onMounted } from 'vue'
import { Form, ErrorMessage, Field } from 'vee-validate'
import IconVector from './icons/IconVector.vue'
import IconMovie from './icons/IconMovie.vue'
import { useMoviesStore } from '../stores/movies/index'
import { useLanguageStore } from '../stores/language/index'
import MovieImage from './MovieImage.vue'
import QuoteTextarea from './QuoteTextarea.vue'
import { useQuotesStore } from '../stores/quotes'
import { useUserStore } from '../stores/user/index'

const language = computed(() => languageStore.currentLanguage)
const userStore = useUserStore()
const quoteStore = useQuotesStore()
const dropDown = ref(false)
const moviesStore = useMoviesStore()
const languageStore = useLanguageStore()
const text = ref('Choose movie')
const chosenMovie = ref(null)
const uploadedImageUrl = ref(null)
const imageUrl = ref(null)
const isDragging = ref(false)
const user = computed(() => userStore.$state.user)
let path = import.meta.env.VITE_BACKEND_URL

const quoteForm = computed(() => quoteStore.$state.addedQuote)

const triggerFileInput = (fileInput) => {
  fileInput.value.click()
}

const onFileChange = async (e, handleChange, validate) => {
  const file = e.target.files[0]
  imageUrl.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
  handleChange('true')
  await validate()
}

const onDrop = async (event, handleChange, validate) => {
  event.preventDefault()
  isDragging.value = false
  const files = event.dataTransfer.files

  if (files.length > 0) {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
    imageUrl.value = file
  }
  handleChange('true')
  await validate()
}

const openDropdown = () => {
  dropDown.value = !dropDown.value
}

const props = defineProps(['username', 'closeQuote', 'image'])
const movies = computed(() => moviesStore.$state.movieList)

onMounted(async () => {
  await moviesStore.fetchMovies()
})

const selectMovie = async (movie, handleChange) => {
  dropDown.value = false
  chosenMovie.value = movie
  handleChange('true')
}

const onSubmit = async () => {
  try {
    const formData = new FormData()

    formData.append('user_id', user.value.id)
    formData.append('body[en]', quoteForm.value.body.en)
    formData.append('body[ka]', quoteForm.value.body.ka)
    formData.append('movie_id', chosenMovie.value.id)

    if (imageUrl.value) {
      formData.append('image', imageUrl.value)
    }

    await quoteStore.addQuote(formData)
    props.closeQuote()
  } catch (error) {
    console.log(error)
  }
}

const uploadedImage = ref(
  props.image && props.image.startsWith('images') ? path + '/storage/' + props.image : props.image
)
</script>

<template>
  <div
    class="h-auto top-[0.625rem] z-10 w-full md:top-[8%] md:left-[25%] xl:left-[28%] 2xl:left-[24%] xl:w-37.5 2xl:w-60 absolute text-white bg-[#11101A] md:w-37.5 rounded-xl"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-1.563 px-3.375">
      <div></div>
      <h1>{{ $t('feed.write_quote') }}</h1>
      <IconClose @click="props.closeQuote" class="cursor-pointer"></IconClose>
    </div>
    <div class="p-2.188">
      <div class="flex items-center gap-4">
        <img
          class="bg-[#D9D9D9] rounded-full w-10 h-10 object-cover"
          alt="name"
          :src="uploadedImage"
        />
        <p>{{ props.username }}</p>
      </div>
      <Form class="relative flex flex-col mt-2.313 gap-4" @submit="onSubmit">
        <div>
          <quote-textarea
            validate="required|english"
            name="body.en"
            rows="4"
            v-model="quoteForm.body.en"
            placeholder="Create new quote"
            lang="Eng"
          ></quote-textarea>
          <ErrorMessage class="text-[#F15524] text-base ml-1.25" name="body.en" />
        </div>
        <div>
          <quote-textarea
            validate="required|georgian"
            name="body.ka"
            rows="4"
            v-model="quoteForm.body.ka"
            placeholder="ახალი ციტატა"
            lang="ქარ"
          ></quote-textarea>
          <ErrorMessage class="text-[#F15524] text-base ml-1.25" name="body.ka" />
        </div>
        <movie-image
          :onFileChangeParent="onFileChange"
          :onDropParent="onDrop"
          :triggerFileInputParent="triggerFileInput"
          :uploadedImageUrl="uploadedImageUrl"
        ></movie-image>
        <Field name="movie" v-slot="{ handleChange }" rules="required">
          <div
            @click="openDropdown"
            class="bg-[#000000] w-full h-5.375 rounded flex justify-between items-center"
          >
            <div class="flex ml-1">
              <IconMovie></IconMovie>
              <p class="ml-0.75 text-base">
                {{ chosenMovie && chosenMovie.title ? chosenMovie.title[language] : text }}
              </p>
            </div>
            <IconVector class="mr-2"></IconVector>
          </div>
          <div
            v-if="dropDown"
            class="text-white bg-black p-1.25 top-5 bottom-3 h-7 overflow-y-scroll"
          >
            <div v-for="movie in movies" :key="movie.id" class="border-b border-b-blue-50 mb-[5px]">
              <p @click="selectMovie(movie, handleChange)">
                {{ movie.title && movie.title[language] }}
              </p>
            </div>
          </div>
          <ErrorMessage class="text-[#F15524] text-base ml-1.25" name="movie" />
        </Field>
        <the-button class="w-full h-3">{{ $t('texts.post') }}</the-button>
      </Form>
    </div>
  </div>
</template>
