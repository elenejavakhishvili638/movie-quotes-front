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
import { useUserStore } from '../stores/user/index'

const props = defineProps(['closeEditQuote', 'id', 'movie'])
const route = useRoute()
const userStore = useUserStore()
let path = import.meta.env.VITE_BACKEND_URL
const quoteStore = useQuotesStore()
const moviesStore = useMoviesStore()
const quote = computed(() => quoteStore.$state.quote)
const user = computed(() => userStore.$state.user)
const quoteForm = ref(null)
const imageUrl = ref(null)
const isDragging = ref(false)
const uploadedImageUrl = ref(null)

onMounted(async () => {
  try {
    await quoteStore.fetchQuote(props.id)
    quoteForm.value = JSON.parse(JSON.stringify(quote.value))
    uploadedImageUrl.value = path + '/storage/' + (quoteForm.value && quoteForm.value.image)
  } catch (error) {
    console.log(error)
  }
})

const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false
  }

  let keys1 = Object.keys(obj1)
  let keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (let key of keys1) {
    if (!keys2.includes(key)) return false
    if (!deepEqual(obj1[key], obj2[key])) return false
  }

  return true
}

const onSubmit = async () => {
  if (deepEqual(quote.value, quoteForm.value) && !imageUrl.value) {
    console.log('sj')
    return
  }

  const id = route.params.id
  try {
    const formData = new FormData()
    formData.append('_method', 'PATCH')
    formData.append('user_id', user.value.id)
    formData.append('movie_id', id)
    formData.append('body[en]', quoteForm.value.body.en)
    formData.append('body[ka]', quoteForm.value.body.ka)

    if (imageUrl.value) {
      formData.append('image', imageUrl.value)
    }

    await quoteStore.editQuote(formData, props.id)
    props.closeEditQuote()
    await moviesStore.fetchMovie(id)
  } catch (error) {
    console.log(error)
  }
}

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
  console.log(imageUrl.value)
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
        <div v-if="quoteForm && quoteForm.body">
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
        <div v-if="quoteForm && quoteForm.body">
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
          type="edit"
        ></movie-image>
        <the-button class="w-full h-[48px]">Save changes</the-button>
      </Form>
    </div>
  </div>
</template>