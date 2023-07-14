<script setup>
import IconTrash from '@/components/icons/IconTrash.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { useMoviesStore } from '@/stores/movies'
import { useQuotesStore } from '@/stores/quotes'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import IconCamera from '@/components/icons/IconCamera.vue'
import TheTextarea from '@/components/TheTextarea.vue'
import TheButton from '@/components/TheButton.vue'
import { useUserStore } from '@/stores/user/index'
import profileImage from '@/assets/images/profile.png'

const props = defineProps(['closeEditQuote', 'id', 'movie', 'image', 'username'])
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
const fileInput = ref(null)
const paramId = route.query.quoteId

onMounted(async () => {
  try {
    await quoteStore.fetchQuoteId(paramId)
    quoteForm.value = quote.value
    uploadedImageUrl.value = path + '/storage/' + (quoteForm.value && quoteForm.value.image)
  } catch (error) {
    console.log(error)
  }
})

const onSubmit = async () => {
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

    await quoteStore.editQuote(formData, paramId)
    props.closeEditQuote()
    await moviesStore.fetchMovieId(id)
  } catch (error) {
    console.log(error)
  }
}

const deleteQuote = async () => {
  try {
    await quoteStore.deleteQuote(paramId)
    const movieId = route.params.id
    await moviesStore.updateMovie(movieId)
    props.closeEditQuote()
  } catch (error) {
    console.log(error)
  }
}

const triggerFileInput = () => {
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

const uploadedImage = ref(
  props.image && props.image.startsWith('images')
    ? path + '/storage/' + props.image
    : props.image || profileImage
)

const onDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'copy'
}

const onDragLeave = (event) => {
  event.preventDefault()
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
    class="h-auto top-0 w-full md:top-[8%] xl:w-37 2xl:w-60 absolute text-white bg-modal md:w-31 rounded-xl"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-1.5 px-3.5">
      <IconTrash @click="deleteQuote" class="cursor-pointer"></IconTrash>
      <h1 class="text-2xl font-medium">{{ $t('movie.edit') }}</h1>
      <IconClose @click="props.closeEditQuote" class="cursor-pointer"></IconClose>
    </div>
    <div class="p-2.25">
      <div class="flex items-center gap-4 mb-2.25">
        <img
          class="bg-[#D9D9D9] rounded-full w-10 h-10 md:w-[3.75rem] md:h-[3.75rem] object-cover"
          alt="name"
          :src="uploadedImage"
        />
        <p class="text-xl">{{ props.username }}</p>
      </div>
      <Form class="relative flex flex-col mt-9 gap-4" @submit="onSubmit">
        <div v-if="quoteForm && quoteForm.body">
          <the-textarea
            validate="required|english"
            name="body.en"
            rows="4"
            v-model="quoteForm.body.en"
            placeholder="Quote in English."
            lang="Eng"
          ></the-textarea>
        </div>
        <div v-if="quoteForm && quoteForm.body">
          <the-textarea
            validate="required|georgian"
            name="body.ka"
            rows="4"
            v-model="quoteForm.body.ka"
            placeholder="ციტატა ქართულ ენაზე"
            lang="ქარ"
          ></the-textarea>
        </div>
        <Field name="image" v-slot="{ handleChange, validate }">
          <div
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop($event, handleChange, validate)"
            class="relative flex items-center justify-center cursor-pointer"
          >
            <div
              @click="triggerFileInput"
              class="text-center flex flex-col items-center justify-center opacity-[80%] rounded-xl w-[8.438rem] h-5.25 bg-backgroundColor absolute"
            >
              <IconCamera></IconCamera>
              {{ $t('movie.change_photo') }}
            </div>
            <img
              :src="uploadedImageUrl"
              class="w-22.375 h-18.875 rounded-xl self-center flex lg:w-56 lg:h-32.063 object-cover"
            />
          </div>
          <input
            type="file"
            id="file-input"
            ref="fileInput"
            style="display: none"
            @change="onFileChange($event, handleChange, validate)"
          />
        </Field>
        <the-button class="w-full h-3">{{ $t('movie.save_changes') }}</the-button>
      </Form>
    </div>
  </div>
</template>
