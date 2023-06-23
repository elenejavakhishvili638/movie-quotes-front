<script setup>
import IconClose from './icons/IconClose.vue'
import MovieInput from './MovieInput.vue'
import { useMoviesStore } from '../stores/movies/index'
import { computed, ref, onMounted, watch } from 'vue'
import { Form, useForm, useField, ErrorMessage } from 'vee-validate'
import TheButton from './TheButton.vue'
import { useUserStore } from '../stores/user/index'
import MovieTextarea from './MovieTextarea.vue'
import { useRoute } from 'vue-router'
import GenreComponent from './GenreComponent.vue'
import MovieImage from './MovieImage.vue'

const props = defineProps(['username', 'closeMovie', 'movie', 'image'])
const movieStore = useMoviesStore()
const userStore = useUserStore()
const route = useRoute()
let path = import.meta.env.VITE_BACKEND_URL

const user = computed(() => userStore.$state.user)
const genres = computed(() => movieStore.$state.genres)
const movieForm = ref(JSON.parse(JSON.stringify(props.movie)))
const genreNames = movieForm.value.genres.map((genre) => genre)
const imageUrl = ref(null)
const isDragging = ref(false)
const tagGenres = ref([...genreNames])
const uploadedImageUrl = ref(path + '/storage/' + movieForm.value.image)
const form = useForm()

const {
  value: tagGenresField,
  errorMessage: tagGenresError,
  validate: validateTagGenres
} = useField('tagGenres', 'arrayNotEmpty', { form })

watch(tagGenres, () => {
  tagGenresField.value = tagGenres.value
  validateTagGenres()
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

onMounted(async () => {
  try {
    await movieStore.fetchGenres()
  } catch (err) {
    console.log(err)
  }
})

const filterGenres = (name) => {
  genres.value.forEach((genre) => {
    if (genre.name === name) {
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
  if (
    deepEqual(props.movie, movieForm.value) &&
    !imageUrl.value &&
    Object.keys(tagGenres.value).length === 0
  ) {
    console.log('snj')
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
    props.closeMovie()
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
  props.image.startsWith('images') 
    ? path + '/storage/' + props.image 
    : props.image
);
</script>

<template>
  <div
    class="h-auto top-2.5 w-full md:top-[8%] md:left-[30%] 2xl:left-[24%] xl:w-37 2xl:w-60 absolute text-white bg-modal md:w-31 rounded-xl"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-6 px-14">
      <div></div>
      <h1 class="text-2xl font-medium">{{ $t('movie.edit_movie') }}</h1>
      <IconClose @click="props.closeMovie" ></IconClose>
    </div>
    <div class="p-9">
      <div class="flex items-center mb-2.25 gap-4">
        <img class="bg-[#D9D9D9] rounded-full w-10 h-10 object-cover" alt="name" :src="uploadedImage" />
        <p>{{ props.username }}</p>
      </div>
      <Form @submit="onSubmit" class="flex flex-col gap-6">
        <movie-input
          v-model="movieForm.title.en"
          name="title_en"
          label="Movie name"
          lang="Eng"
          type="text"
          validate="required"
        ></movie-input>
        <movie-input
          v-model="movieForm.title.ka"
          name="title_ka"
          label="ფილმის სახელი"
          lang="ქარ"
          type="text"
          validate="required"
        ></movie-input>
        <genre-component
          :error="tagGenresError"
          :filter="filterGenres"
          :remove="removeTag"
          :tagGenres="tagGenres"
          type="edit"
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
          name="director_en"
          label="Director"
          lang="Eng"
          type="text"
          validate="required"
        ></movie-input>
        <movie-input
          v-model="movieForm.director.ka"
          name="director_ka"
          label="რეჟისორი"
          lang="ქარ"
          type="text"
          validate="required"
        ></movie-input>
        <div>
          <movie-textarea
            validate="required"
            name="description_en"
            rows="4"
            v-model="movieForm.description.en"
            label="Movie Description :"
            :class="{ 'text-[#6C757D]': movieForm.description.en }"
          ></movie-textarea>
          <ErrorMessage class="text-[#F15524] text-base ml-5" name="description_en" />
        </div>
        <div>
          <movie-textarea
            validate="required"
            name="description_ka"
            rows="4"
            v-model="movieForm.description.ka"
            label="ფილმის აღწერა :"
            :class="{ 'text-[#6C757D]': movieForm.description.ka }"
          ></movie-textarea>
          <ErrorMessage class="text-[#F15524] text-base ml-5" name="description_ka" />
        </div>
        <movie-image
          :onFileChangeParent="onFileChange"
          :onDropParent="onDrop"
          :triggerFileInputParent="triggerFileInput"
          :uploadedImageUrl="uploadedImageUrl"
          type="edit"
        ></movie-image>
        <the-button type="submit" class="w-full">{{ $t('movie.edit_movie') }}</the-button>
      </Form>
    </div>
  </div>
</template>
