<script setup>
import close from '../assets/images/logos/close.png'
import MovieInput from './MovieInput.vue'
import { useMoviesStore } from '../stores/movies/index'
import { computed, ref, onMounted, watch } from 'vue'
import { Form, useField, ErrorMessage, useForm } from 'vee-validate'
import TheButton from './TheButton.vue'
import image from '../assets/images/logos/image.png'
import { useUserStore } from '../stores/user/index'
import MovieTextarea from './MovieTextarea.vue'
import GenreComponent from './GenreComponent.vue'

const props = defineProps(['username', 'closeMovie'])
const fileInput = ref(null)
const movieStore = useMoviesStore()
const userStore = useUserStore()
const uploadedImageUrl = ref(null)
const imageUrl = ref(null)
const tagGenres = ref([])
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
    console.log(errors)
    if (Object.keys(errors).length === 0) {
      await movieStore.fetchFullList()
      props.closeMovie()
    }
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
      <h1>{{ $t('movie.add_movie') }}</h1>
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
        <!-- <div class="relative">
          <div
            class="flex gap-[4px] w-full border border-[#6C757D] h-[48px] rounded-[5px] items-center"
          >
            <p @click="openGenreModal" class="ml-[16px] cursor-pointer">Genres:</p>
            <div
              class="text-white text-[14px] ml-[16px] bg-[#6C757D] py-[2px] px-[6px] rounded-[2px]"
              v-for="(tag, index) in tagGenres"
              :key="index"
            >
              {{ tag.name }}
              <span @click="removeTag(tag.id)" class="ml-[9px]">x</span>
            </div>
          </div>
          <div
            v-if="genreModal"
            class="right-[50px] bottom-[-190px] z-10 absolute grid-cols-3 xl:grid-cols-5 gap-4 grid bg-black p-[16px]"
          >
            <span @click="closeGenreModal" class="bg-[#728ba1] text-center cursor-pointer">X</span>
            <div
              class="text-white text-[14px] bg-[#6C757D] py-[2px] px-[6px] rounded-[2px]"
              v-for="(tag, index) in genres"
              :key="index"
              @click="filterGenres(tag.name)"
            >
              {{ tag.name }}
            </div>
          </div>
          <p class="text-[#F15524] text-base ml-[20px]">
            {{ tagGenresError }}
          </p>
        </div> -->
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
          <ErrorMessage class="text-[#F15524] text-base ml-[20px]" name="description.en" />
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
          <ErrorMessage class="text-[#F15524] text-base ml-[20px]" name="description.ka" />
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
              class="bg-[#9747FF66] ml-[16px] w-[150px] h-[42px] mr-[16px] text-[18px] outline-none"
              @click="triggerFileInput"
            >
              {{ $t('movie.choose') }}
            </button>
          </div>
        </div>
        <the-button type="submit" class="w-full"> {{ $t('movie.add_movie') }}</the-button>
      </Form>
    </div>
  </div>
</template>
