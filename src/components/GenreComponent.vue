<script setup>
import { computed, ref } from 'vue'
import { useMoviesStore } from '../stores/movies/index'
import { ErrorMessage, Field } from 'vee-validate'
import { useLanguageStore } from '../stores/language/index'

const props = defineProps(['error', 'filter', 'remove', 'tagGenres', 'type'])

const movieStore = useMoviesStore()
const languageStore = useLanguageStore()
const genres = computed(() => movieStore.$state.genres)
const genreModal = ref(false)

const openGenreModal = () => {
  genreModal.value = true
}

const closeGenreModal = () => {
  genreModal.value = false
}

const handleClick = (name, handleChange) => {
  props.filter(name)
  handleChange('true')
}

const genreRule = computed(() => {
  return props.type === 'edit' ? '' : 'required'
})
const language = computed(() => languageStore.currentLanguage)
</script>

<template>
  <div class="relative">
    <div
      @click="openGenreModal"
      class="flex gap-1 w-full border border-[#6C757D] h-12 rounded items-center overflow-x-scroll"
    >
      <p class="ml-1 cursor-pointer" v-if="tagGenres.length === 0">{{ $t('movie.genres') }}:</p>
      <div
        class="text-white text-xs ml-1 bg-[#6C757D] py-0.25 px-0.25 rounded min-w-[5rem] flex items-center justify-center"
        v-for="(tag, index) in tagGenres"
        :key="index"
      >
        {{ tag.name[language] }}
        <span @click="props.remove(tag.id)" class="ml-0.25 cursor-pointer text-xs">x</span>
      </div>
    </div>
    <Field name="genre" v-slot="{ handleChange }" :rules="genreRule">
      <div
        v-if="genreModal"
        class="w-full bottom-[-11.875rem] h-12.5 z-10 absolute flex flex-col gap-4 bg-black p-1 overflow-y-scroll"
      >
        <span @click="closeGenreModal" class="bg-[#728ba1] text-center cursor-pointer">X</span>
        <div
          class="text-white text-base border-b-2 py-0.25 px-0.5 rounded cursor-pointer"
          v-for="(tag, index) in genres"
          :key="index"
          @click="handleClick(tag.name, handleChange)"
        >
          {{ tag.name[language] }}
        </div>
      </div>
    </Field>
    <p class="text-[#F15524] text-base mt-1">
      {{ props.error }}
    </p>
    <ErrorMessage class="text-[#F15524] text-base mt-1" name="genre" />
  </div>
</template>
