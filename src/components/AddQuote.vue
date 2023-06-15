<script setup>
import close from '../assets/images/logos/close.png'
import TheButton from '../components/TheButton.vue'
import { ref, computed } from 'vue'
import { Form, ErrorMessage } from 'vee-validate'
import { useMoviesStore } from '../stores/movies/index'
import { useLanguageStore } from '../stores/language/index'
import MovieImage from './MovieImage.vue'
import QuoteTextarea from './QuoteTextarea.vue'
import { useQuotesStore } from '../stores/quotes'
import { useUserStore } from '../stores/user/index'

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

const props = defineProps(['username', 'closeQuote', 'movie'])
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

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1])
    // }
    await quoteStore.addQuote(formData)
    await moviesStore.fetchMovie(props.movie.id)

    props.closeQuote()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div
    class="h-auto top-[10px] w-full md:top-[8%] md:left-[35%] xl:left-[28%] 2xl:left-[24%] xl:w-[601px] 2xl:w-[961px] absolute text-white bg-[#11101A] md:w-[500px] rounded-[12px] z-10"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-[25px] px-[54px]">
      <div></div>
      <h1 class="text-[24px] font-[500]">Add quote</h1>
      <img @click="props.closeQuote" :src="close" />
    </div>
    <div class="p-[35px]">
      <div class="flex items-center gap-[16px]">
        <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        <p>{{ props.username }}</p>
      </div>
      <div
        class="bg-[#000000] md:bg-transparent min-w-[340px] h-[114px] md:h-[170px] mt-[32px] py-[16px] px-[8px] flex gap-[12px] md:gap-[30px] items-center"
      >
        <div>
          <img
            :src="path + '/storage/' + movie.image"
            class="h-[82px] w-[122px] md:h-[158px] md:w-[290px] object-cover rounded-[12px]"
          />
        </div>
        <div>
          <h1 class="text-[#DDCCAA] text-[16px] lg:text-[24px] font-[400] mb-[8px]">
            {{ movie.title && movie.title[language] }}
            ({{ movie.year }})
          </h1>
          <p class="mb-[8px] text-[#CED4DA] text-[16px] lg:text-[18px] font-[700]">
            {{ $t('movie.director') }}:
            <span class="text-white font-[500]">{{
              movie.director && movie.director[language]
            }}</span>
          </p>
          <div class="flex gap-[4px]">
            <div
              class="px-[8px] py-[4px] bg-[#6C757D] rounded-[4px]"
              v-for="genre in props.movie.genres"
              :key="genre.id"
            >
              <p class="font-[700] text-[12px] lg:text-[18px]">{{ genre.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <Form class="relative flex flex-col mt-[37px] gap-[16px]" @submit="onSubmit">
        <div>
          <quote-textarea
            validate="required|english"
            name="body.en"
            rows="4"
            v-model="quoteForm.body.en"
            placeholder="Quote in English."
            lang="Eng"
          ></quote-textarea>
          <ErrorMessage class="text-[#F15524] text-base ml-[20px]" name="body.en" />
        </div>
        <div>
          <quote-textarea
            validate="required|georgian"
            name="body.ka"
            rows="4"
            v-model="quoteForm.body.ka"
            placeholder="ციტატა ქართულ ენაზე"
            lang="ქარ"
          ></quote-textarea>
          <ErrorMessage class="text-[#F15524] text-base ml-[20px]" name="body.ka" />
        </div>
        <movie-image
          :onFileChangeParent="onFileChange"
          :onDropParent="onDrop"
          :triggerFileInputParent="triggerFileInput"
          :uploadedImageUrl="uploadedImageUrl"
        ></movie-image>
        <the-button class="w-full h-[48px]">Add quote</the-button>
      </Form>
    </div>
  </div>
</template>
