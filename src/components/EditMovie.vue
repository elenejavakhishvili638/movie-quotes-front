<script setup>
import close from '../assets/images/logos/close.png'
import MovieInput from './MovieInput.vue'
import { useMoviesStore } from '../stores/movies/index'
import { computed, ref, onMounted, watch } from 'vue'
import { Form, useForm, useField, ErrorMessage } from 'vee-validate'
import TheButton from './TheButton.vue'
import image from '../assets/images/logos/image.png'
import { useUserStore } from '../stores/user/index'
import MovieTextarea from './MovieTextarea.vue'
import { useRoute } from 'vue-router'
import GenreComponent from './GenreComponent.vue'

const props = defineProps(['username', 'closeMovie', 'movie'])
const fileInput = ref(null)
const movieStore = useMoviesStore()
const userStore = useUserStore()
const route = useRoute()
let path = import.meta.env.VITE_BACKEND_URL

const user = computed(() => userStore.$state.user)
const genres = computed(() => movieStore.$state.genres)
const movieForm = ref(JSON.parse(JSON.stringify(props.movie)))
const genreNames = movieForm.value.genres.map((genre) => genre)
const imageUrl = ref(null)
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
  if (deepEqual(props.movie, movieForm.value) && !imageUrl.value) {
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

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    await movieStore.editMovie(formData, id)
    await movieStore.updateMovie(id)
    props.closeMovie()
  } catch (error) {
    console.log(error)
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  imageUrl.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div
    class="h-auto top-0 w-full md:top-[8%] md:left-[35%] xl:left-[28%] 2xl:left-[24%] xl:w-[601px] 2xl:w-[961px] absolute text-white bg-[#11101A] md:w-[500px] rounded-[12px]"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-[25px] px-[54px]">
      <div></div>
      <h1>{{ $t('movie.edit_movie') }}</h1>
      <img @click="props.closeMovie" :src="close" />
    </div>
    <div class="p-[35px]">
      <div class="flex items-center gap-[16px]">
        <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        <p>{{ props.username }}</p>
      </div>
      <Form @submit="onSubmit" class="flex flex-col mt-[37px] gap-[24px]">
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
          <ErrorMessage class="text-[#F15524] text-base ml-[20px]" name="description_en" />
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
          <ErrorMessage class="text-[#F15524] text-base ml-[20px]" name="description_ka" />
        </div>
        <div
          :class="{ 'h-[142px] lg:h-[185px]': uploadedImageUrl }"
          class="flex justify-between items-center border border-[#6C757D] w-full h-[82px] rounded-[4px]"
        >
          <img
            :src="uploadedImageUrl"
            v-if="uploadedImageUrl"
            class="ml-[24px] w-[433px] h-[110px] lg:h-[144px] object-contain border border-dashed border-[DDCCAA]"
          />
          <input
            type="file"
            id="file-input"
            ref="fileInput"
            style="display: none"
            @change="onFileChange"
          />
          <div
            class="flex items-center gap-[20px]"
            :class="{
              'flex flex-col items-center mr-[24px] lg:mr-[54px] gap-[16px]': uploadedImageUrl
            }"
          >
            <div class="flex ml-[16px] items-center">
              <img :src="image" />
              <p class="text-[20px] font-normal ml-[13px]">{{ $t('movie.upload') }}</p>
            </div>
            <button
              type="button"
              class="bg-[#9747FF66] ml-[16px] w-[140px] h-[42px] mr-[16px] text-[18px] outline-none"
              @click="triggerFileInput"
            >
              {{ $t('movie.choose') }}
            </button>
          </div>
        </div>
        <the-button type="submit" class="w-full">{{ $t('movie.edit_movie') }}</the-button>
      </Form>
    </div>
  </div>
</template>
