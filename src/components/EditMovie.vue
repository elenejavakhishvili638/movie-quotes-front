<script setup>
import IconClose from '@/components/icons/IconClose.vue'
import MovieInput from '@/components/MovieInput.vue'
import { useMoviesStore } from '@/stores/movies/index'
import { computed, ref, onMounted, watch } from 'vue'
import { Form, useForm, useField } from 'vee-validate'
import TheButton from '@/components/TheButton.vue'
import { useUserStore } from '@/stores/user/index'
import TheTextarea from '@/components/TheTextarea.vue'
import { useRoute } from 'vue-router'
import GenreComponent from '@/components/GenreComponent.vue'
import MovieImage from '@/components/MovieImage.vue'
import { cloneDeep } from 'lodash'
import profileImage from '@/assets/images/profile.png'

const props = defineProps(['username', 'closeMovie', 'movie', 'image'])
const movieStore = useMoviesStore()
const userStore = useUserStore()
const route = useRoute()
let path = import.meta.env.VITE_BACKEND_URL

const user = computed(() => userStore.$state.user)
const genres = computed(() => movieStore.$state.genres)
const movieForm = ref(movieStore.$state.movie)
const tagGenres = ref([])
const imageUrl = ref(null)
const isDragging = ref(false)
const uploadedImageUrl = ref(null)
const form = useForm()
const errors = computed(() => movieStore.$state.editErrors)

const {
  value: tagGenresField,
  errorMessage: tagGenresError,
  validate: validateTagGenres
} = useField('tagGenres', 'arrayNotEmpty', { form })

watch(tagGenres, () => {
  tagGenresField.value = tagGenres.value
  validateTagGenres()
})

onMounted(async () => {
  const id = route.params.id
  try {
    await movieStore.fetchGenres()
    await movieStore.fetchMovie(id)
    movieForm.value = cloneDeep(movieStore.$state.movie)
    if (movieForm.value.genres) {
      tagGenres.value = movieForm.value.genres
    }
    if (movieForm.value.image) {
      uploadedImageUrl.value = path + '/storage/' + movieForm.value.image
    }
  } catch (err) {
    console.log(err)
  }
})

const filterGenres = async (name) => {
  genres.value.forEach((genre) => {
    if (
      genre.name === name &&
      !tagGenres.value.some((tagGenre) => JSON.stringify(tagGenre.name) === JSON.stringify(name))
    ) {
      tagGenres.value.push(genre)
    }
  })
  tagGenresField.value = tagGenres.value
}

const removeTag = (id) => {
  tagGenres.value = tagGenres.value.filter((tag) => tag.id !== id)
  tagGenresField.value = tagGenres.value
}

const onSubmit = async () => {
  if (!imageUrl.value && Object.keys(tagGenres.value).length === 0) {
    return
  }
  const id = route.params.id
  try {
    const formData = new FormData()
    formData.append('_method', 'PATCH')
    formData.append('user_id', user.value.id)
    formData.append('year', movieForm.value.year)
    formData.append('title[en]', movieForm.value.title.en)
    formData.append('title[ka]', movieForm.value.title.ka)
    formData.append('description[en]', movieForm.value.description.en)
    formData.append('description[ka]', movieForm.value.description.ka)
    formData.append('director[en]', movieForm.value.director.en)
    formData.append('director[ka]', movieForm.value.director.ka)

    tagGenres.value.forEach((genre, index) => {
      formData.append(`genres[${index}]`, genre.id)
    })

    if (imageUrl.value) {
      formData.append('image', imageUrl.value)
    }

    await movieStore.editMovie(formData, id)
    if (Object.keys(errors.value).length === 0) {
      await movieStore.fetchFullList()
      props.closeMovie()
    }
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

const uploadedImage = ref(
  props.image && props.image.startsWith('images')
    ? path + '/storage/' + props.image
    : props.image || profileImage
)
</script>

<template>
  <div
    class="h-auto top-0 w-full md:top-[8%] md:left-[30%] 2xl:left-[24%] xl:w-60 2xl:w-60 absolute text-white bg-modal md:w-31 rounded-xl"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-1.5 px-3.5">
      <div></div>
      <h1 class="text-2xl font-medium">{{ $t('movie.edit_movie') }}</h1>
      <IconClose @click="props.closeMovie" class="cursor-pointer"></IconClose>
    </div>
    <div class="p-2.25">
      <div class="flex items-center mb-2.25 gap-4">
        <img
          class="bg-[#D9D9D9] rounded-full w-10 h-10 object-cover"
          alt="name"
          :src="uploadedImage"
        />
        <p>{{ props.username }}</p>
      </div>
      <Form @submit="onSubmit" class="flex flex-col gap-6">
        <movie-input
          v-if="movieForm.title"
          v-model="movieForm.title.en"
          name="title.en"
          label="Movie name"
          lang="Eng"
          type="text"
          validate="required"
          :errors="errors"
        ></movie-input>
        <movie-input
          v-if="movieForm.title"
          v-model="movieForm.title.ka"
          name="title.ka"
          label="ფილმის სახელი"
          lang="ქარ"
          type="text"
          validate="required"
          :errors="errors"
        ></movie-input>
        <genre-component
          v-if="movieForm.genres"
          :error="tagGenresError"
          :filter="filterGenres"
          :remove="removeTag"
          :tagGenres="tagGenres"
          type="edit"
        ></genre-component>
        <movie-input
          v-if="movieForm.year"
          v-model="movieForm.year"
          name="year"
          label="წელი/year"
          type="number"
          validate="required"
        ></movie-input>
        <movie-input
          v-if="movieForm.director"
          v-model="movieForm.director.en"
          name="director.en"
          label="Director"
          lang="Eng"
          type="text"
          validate="required"
        ></movie-input>
        <movie-input
          v-if="movieForm.director"
          v-model="movieForm.director.ka"
          name="director.ka"
          label="რეჟისორი"
          lang="ქარ"
          type="text"
          validate="required"
        ></movie-input>
        <the-textarea
          v-if="movieForm.description"
          validate="required"
          name="description.en"
          rows="4"
          v-model="movieForm.description.en"
          label="Movie Description :"
          lang="Eng"
          :class="{ 'text-[#6C757D]': movieForm.description.en }"
        ></the-textarea>
        <the-textarea
          v-if="movieForm.description"
          validate="required"
          name="description.ka"
          rows="4"
          v-model="movieForm.description.ka"
          lang="ქარ"
          label="ფილმის აღწერა :"
          :class="{ 'text-[#6C757D]': movieForm.description.ka }"
        ></the-textarea>
        <movie-image
          :onFileChangeParent="onFileChange"
          :onDropParent="onDrop"
          :triggerFileInputParent="triggerFileInput"
          :uploadedImageUrl="uploadedImageUrl"
          type="edit"
          :errors="errors"
        ></movie-image>
        <the-button type="submit" class="w-full">{{ $t('movie.edit_movie') }}</the-button>
      </Form>
    </div>
  </div>
</template>
