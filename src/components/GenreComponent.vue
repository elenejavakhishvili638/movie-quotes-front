<script setup>
import { computed, ref } from 'vue'
import { useMoviesStore } from '../stores/movies/index'
import { ErrorMessage, Field } from 'vee-validate'

const props = defineProps(['error', 'filter', 'remove', 'tagGenres'])

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
</script>

<template>
  <div class="relative">
    <div class="flex gap-[4px] w-full border border-[#6C757D] h-[48px] rounded-[5px] items-center">
      <p @click="openGenreModal" class="ml-[16px] cursor-pointer">Genres:</p>
      <div
        class="text-white text-[14px] ml-[16px] bg-[#6C757D] py-[2px] px-[6px] rounded-[2px]"
        v-for="(tag, index) in tagGenres"
        :key="index"
      >
        {{ tag.name }}
        <span @click="props.remove(tag.id)" class="ml-[9px]">x</span>
      </div>
    </div>
    <Field name="genre" v-slot="{ meta, handleChange }" rules="required">
      <div
        v-if="genreModal"
        class="left-[100px] md:left-[200px] bottom-[-180px] h-[200px] w-[250px] z-10 absolute flex flex-col gap-4 bg-black p-[16px] overflow-y-scroll"
      >
        <span @click="closeGenreModal" class="bg-[#728ba1] text-center cursor-pointer">X</span>
        <div
          class="text-white text-[14px] bg-[#6C757D] py-[2px] px-[6px] rounded-[2px]"
          v-for="(tag, index) in genres"
          :key="index"
          @click="handleClick(tag.name, handleChange)"
        >
          {{ tag.name }}
        </div>
        {{ meta }}
      </div>
    </Field>
    <p class="text-[#F15524] text-base ml-[20px] mt-[16px]">
      {{ props.error }}
    </p>
    <ErrorMessage class="text-[#F15524] text-base ml-[20px] mt-[16px]" name="genre" />
  </div>
</template>
