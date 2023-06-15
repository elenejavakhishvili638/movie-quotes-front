<script setup>
import trash from '../assets/images/logos/trash.png'
import close from '../assets/images/logos/close.png'
import { useMoviesStore } from '../stores/movies'
import { useQuotesStore } from '../stores/quotes'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { Form, ErrorMessage } from 'vee-validate'
import MovieImage from './MovieImage.vue'
import QuoteTextarea from './QuoteTextarea.vue'
import TheButton from '../components/TheButton.vue'

const props = defineProps(['closeEditQuote', 'id', 'movie'])
const route = useRoute()
let path = import.meta.env.VITE_BACKEND_URL
const quoteStore = useQuotesStore()
const moviesStore = useMoviesStore()
const quote = computed(() => quoteStore.$state.quote)
const imageUrl = ref(null)
const isDragging = ref(false)
const uploadedImageUrl = ref(path + '/storage/' + quote.value.image)

onMounted(async () => {
  try {
    await quoteStore.fetchQuote(props.id)
    console.log(quote.value)
  } catch (error) {
    console.log(error)
  }
})

const onSubmit = async () => {}

const deleteQuote = async () => {
  try {
    await quoteStore.deleteQuote(props.id)
    const movieId = route.params.id
    await moviesStore.updateMovie(movieId)
    props.closeViewQuote()
  } catch (error) {
    console.log(error)
  }
}

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
</script>

<template>
  <div
    class="h-auto top-2.5 w-full md:top-[8%] xl:w-37 2xl:w-60 absolute text-white bg-modal md:w-31 rounded-xl"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-6 px-14">
      <img :src="trash" @click="deleteQuote" />
      <h1 class="text-2xl font-medium">Edit quote</h1>
      <img @click="props.closeEditQuote" :src="close" />
    </div>
    <div class="p-9">
      <div class="flex items-center gap-4 mb-2.25">
        <img class="bg-[#D9D9D9] rounded-full w-10 h-10" alt="name" />
        <p class="text-[20px]">{{ quote.user && quote.user.username }}</p>
      </div>
      <Form class="relative flex flex-col mt-9 gap-4" @submit="onSubmit">
        <div v-if="quote.body">
          <quote-textarea
            validate="required|english"
            name="body.en"
            rows="4"
            v-model="quote.body.en"
            placeholder="Quote in English."
            lang="Eng"
          ></quote-textarea>
          <ErrorMessage class="text-[#F15524] text-base ml-[20px]" name="body.en" />
        </div>
        <div v-if="quote.body">
          <quote-textarea
            validate="required|georgian"
            name="body.ka"
            rows="4"
            v-model="quote.body.ka"
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
        <the-button class="w-full h-[48px]">Save changes</the-button>
      </Form>
    </div>
  </div>
</template>
