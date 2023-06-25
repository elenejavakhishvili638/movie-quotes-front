<script setup>
import IconClose from './icons/IconClose.vue'
import MovieInput from './MovieInput.vue'
import { useMoviesStore } from '../stores/movies/index'
import { computed, ref, onMounted, watch } from 'vue'
import { Form, useField, ErrorMessage, useForm } from 'vee-validate'
import TheButton from './TheButton.vue'
import { useUserStore } from '../stores/user/index'
import MovieTextarea from './MovieTextarea.vue'
import GenreComponent from './GenreComponent.vue'
import MovieImage from './MovieImage.vue'

const props = defineProps(['username', 'closeMovie', 'image'])
const movieStore = useMoviesStore()
const userStore = useUserStore()
const uploadedImageUrl = ref(null)
const imageUrl = ref(null)
const tagGenres = ref([])
const form = useForm()
const isDragging = ref(false)
let path = import.meta.env.VITE_BACKEND_URL


const {
  value: tagGenresField,
  errorMessage: tagGenresError,
  validate: validateTagGenres
} = useField('tagGenres', 'arrayNotEmpty', { form })

watch(tagGenres, () => {
  tagGenresField.value = tagGenres.value
  validateTagGenres()
})

const user = computed(() => userStore.$state.user)
const genres = computed(() => movieStore.$state.genres)
const movieForm = computed(() => movieStore.$state.addedMovie)
const errors = movieStore.$state.errors

onMounted(async () => {
  try {
    await movieStore.fetchGenres()
  } catch (err) {
    console.log(err)
  }
})

const filterGenres = async (name) => {
  genres.value.forEach((genre) => {
    if (genre.name === name && !tagGenres.value.some((tagGenre) => tagGenre.name === name)) {
      tagGenres.value.push(genre);
    }
  });
  tagGenresField.value = tagGenres.value;
}

const removeTag = (id) => {
  tagGenres.value = tagGenres.value.filter((tag) => tag.id !== id)
  tagGenresField.value = tagGenres.value
}

const onSubmit = async () => {
  try {
    const isTagGenresValid = await validateTagGenres()
    if (!isTagGenresValid.valid) {
      return
    }
    const formData = new FormData()

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

    await movieStore.addMovie(formData)
    if (Object.keys(errors).length === 0) {
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
    : props.image
);
</script>

<template>
  <div
    class="h-auto top-[0.625rem] w-full md:top-[8%] md:left-[35%] xl:left-[28%] 2xl:left-[24%] xl:w-37.5 2xl:w-60 absolute text-white bg-[#11101A]  md:w-37.5 rounded-xl"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-1.563 px-3.375">
      <div></div>
      <h1>{{ $t('movie.add_movie') }}</h1>
      <IconClose @click="props.closeMovie" class="cursor-pointer" ></IconClose>
    </div>
    <div class="p-2.188">
      <div class="flex items-center gap-4">
        <img class="bg-[#D9D9D9] rounded-full w-10 h-10 object-cover" alt="name" :src="uploadedImage" />
        <p>{{ props.username }}</p>
      </div>
      <Form @submit="onSubmit" class="flex flex-col mt-2.313 gap-4">
        <movie-input
          v-model="movieForm.title.en"
          name="title.en"
          label="Movie name"
          lang="Eng"
          type="text"
          validate="required|english"
        ></movie-input>
        <movie-input
          v-model="movieForm.title.ka"
          name="title.ka"
          label="ფილმის სახელი"
          lang="ქარ"
          type="text"
          validate="required|georgian"
        ></movie-input>
        <genre-component
          :error="tagGenresError"
          :filter="filterGenres"
          :remove="removeTag"
          :tagGenres="tagGenres"
        ></genre-component>
        <movie-input
          v-model="movieForm.year"
          name="year"
          label="წელი/year"
          type="number"
          validate="required"
        ></movie-input>
        <movie-input
          v-model="movieForm.director.en"
          name="director.en"
          label="Director"
          lang="Eng"
          type="text"
          validate="required|english"
        ></movie-input>
        <movie-input
          v-model="movieForm.director.ka"
          name="director.ka"
          label="რეჟისორი"
          lang="ქარ"
          type="text"
          validate="required|georgian"
        ></movie-input>
        <div>
          <movie-textarea
            validate="required|english"
            name="description.en"
            rows="4"
            v-model="movieForm.description.en"
            label="Movie Description :"
            :class="{ 'text-[#6C757D]': movieForm.description.en }"
          ></movie-textarea>
          <ErrorMessage class="text-[#F15524] text-base ml-1.25" name="description.en" />
        </div>
        <div>
          <movie-textarea
            validate="required|georgian"
            name="description.ka"
            rows="4"
            v-model="movieForm.description.ka"
            label="ფილმის აღწერა :"
            :class="{ 'text-[#6C757D]': movieForm.description.ka }"
          ></movie-textarea>
          <ErrorMessage class="text-[#F15524] text-base ml-1.25" name="description.ka" />
        </div>
        <movie-image
          :onFileChangeParent="onFileChange"
          :onDropParent="onDrop"
          :triggerFileInputParent="triggerFileInput"
          :uploadedImageUrl="uploadedImageUrl"
        ></movie-image>
        <the-button type="submit" class="w-full"> {{ $t('movie.add_movie') }}</the-button>
      </Form>
    </div>
  </div>
</template>
