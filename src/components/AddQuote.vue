<script setup>
import IconClose from '@/components/icons/IconClose.vue'
import TheButton from '@/components/TheButton.vue'
import { ref, computed } from 'vue'
import { Form } from 'vee-validate'
import { useMoviesStore } from '@/stores/movies/index'
import { useLanguageStore } from '@/stores/language/index'
import MovieImage from '@/components/MovieImage.vue'
import QuoteTextarea from '@/components/QuoteTextarea.vue'
import { useQuotesStore } from '@/stores/quotes'
import { useUserStore } from '@/stores/user/index'

const userStore = useUserStore()
const quoteStore = useQuotesStore()
const moviesStore = useMoviesStore()
const languageStore = useLanguageStore()
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

const props = defineProps(['username', 'closeQuote', 'movie', 'image'])
const language = computed(() => languageStore.currentLanguage)

const onSubmit = async () => {
  try {
    const formData = new FormData()

    formData.append('user_id', user.value.id)
    formData.append('body[en]', quoteForm.value.body.en)
    formData.append('body[ka]', quoteForm.value.body.ka)
    formData.append('movie_id', props.movie.id)

    if (imageUrl.value) {
      formData.append('image', imageUrl.value)
    }
    await quoteStore.addQuote(formData)
    await moviesStore.fetchMovieId(props.movie.id)
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
    class="h-auto top-0 w-full md:top-[8%] md:left-[30%] xl:left-[25%] xl:w-37 2xl:w-60 absolute text-white bg-modal md:w-31 rounded-xl"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-1.5 px-3.5">
      <div></div>
      <h1 class="text-2xl font-medium">{{ $t('movie.add_quote') }}</h1>
      <IconClose @click="props.closeQuote"></IconClose>
    </div>
    <div class="p-2.25">
      <div class="flex items-center gap-4 mb-2.25">
        <img
          class="bg-[#D9D9D9] rounded-full w-10 h-10 md:w-[3.75rem] md:h-[3.75rem] object-cover"
          alt="name"
          :src="uploadedImage"
        />
        <p>{{ props.username }}</p>
      </div>
      <div
        class="bg-[#000000] md:bg-transparent min-w-[21rem] h-7 md:h-11 mb-2.25 py-1 px-0.5 flex gap-3 md:gap-7 items-center"
      >
        <div>
          <img
            :src="path + '/storage/' + movie.image"
            class="h-5 w-8 md:h-[10rem] md:w-18 object-cover rounded-xl"
          />
        </div>
        <div class="md:flex md:flex-col md:gap-4">
          <h1 class="text-[#DDCCAA] text-base lg:text-2xl font-[400]">
            {{ movie.title && movie.title[language] }}
            ({{ movie.year }})
          </h1>
          <p class="text-[#CED4DA] text-base lg:text-lg font-[700]">
            {{ $t('movie.director') }}:
            <span class="text-white font-[500]">{{
              movie.director && movie.director[language]
            }}</span>
          </p>
          <div class="flex gap-1">
            <div
              class="px-0.5 py-0.25 bg-[#6C757D] rounded"
              v-for="genre in props.movie.genres"
              :key="genre.id"
            >
              <p class="font-[700] text-xs lg:text-lg">{{ genre.name[language] }}</p>
            </div>
          </div>
        </div>
      </div>
      <Form class="relative flex flex-col mt-9 gap-4" @submit="onSubmit">
        <quote-textarea
          validate="required|english"
          name="body.en"
          rows="4"
          v-model="quoteForm.body.en"
          placeholder="Quote in English."
          lang="Eng"
        ></quote-textarea>
        <quote-textarea
          validate="required|georgian"
          name="body.ka"
          rows="4"
          v-model="quoteForm.body.ka"
          placeholder="ციტატა ქართულ ენაზე"
          lang="ქარ"
        ></quote-textarea>
        <movie-image
          :onFileChangeParent="onFileChange"
          :onDropParent="onDrop"
          :triggerFileInputParent="triggerFileInput"
          :uploadedImageUrl="uploadedImageUrl"
        ></movie-image>
        <the-button class="w-full h-[3rem]">{{ $t('movie.add_quote') }}</the-button>
      </Form>
    </div>
  </div>
</template>
