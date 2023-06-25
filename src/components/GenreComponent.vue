<script setup>
import { computed, ref } from 'vue'
import { useMoviesStore } from '../stores/movies/index'
import { ErrorMessage, Field } from 'vee-validate'

const props = defineProps(['error', 'filter', 'remove', 'tagGenres', 'type'])

const movieStore = useMoviesStore()
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
</script>

<template>
  <div class="relative">
    <div @click="openGenreModal" class="flex gap-1 w-full border border-[#6C757D] h-12 rounded items-center">
      <p class="ml-1 cursor-pointer" v-if="tagGenres.length === 0">Genres:</p>
      <div
        class="text-white text-sm ml-1 bg-[#6C757D] py-0.25 px-0.5 rounded"
        v-for="(tag, index) in tagGenres"
        :key="index"
      >
        {{ tag.name }}
        <span @click="props.remove(tag.id)" class="ml-0.5">x</span>
      </div>
    </div>
    <Field name="genre" v-slot="{ handleChange }" :rules="genreRule">
      <div
        v-if="genreModal"
        class="w-full bottom-[-11.875rem] h-12.5 z-10 absolute flex flex-col gap-4 bg-black p-1 overflow-y-scroll"
      >
        <span @click="closeGenreModal" class="bg-[#728ba1] text-center cursor-pointer">X</span>
        <div
          class="text-white text-base border-b-2 py-0.25 px-0.5 rounded"
          v-for="(tag, index) in genres"
          :key="index"
          @click="handleClick(tag.name, handleChange)"
        >
          {{ tag.name }}
        </div>
      </div>
    </Field>
    <p class="text-[#F15524] text-base ml-1.25 mt-1">
      {{ props.error }}
    </p>
    <ErrorMessage class="text-[#F15524] text-base ml-1.25 mt-1" name="genre" />
  </div>
</template>
