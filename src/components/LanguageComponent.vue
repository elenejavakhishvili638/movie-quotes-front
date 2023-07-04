<script setup>
import { computed } from 'vue'
import IconVector from './icons/IconVector.vue'
import { useLanguageStore } from '../stores/language/index'

const props = defineProps(['type'])

const langMargin = computed(() => {
  if (props.type === 'feed') {
    return 'top-[80%]'
  } else {
    return 'top-[8%]'
  }
})

const language = useLanguageStore()

const changeLanguage = (newLanguage, display) => {
  language.show = false
  language.setLanguage({ newLanguage, display })
}

const toggleLang = () => {
  language.show = !language.show
}
</script>

<template>
  <div class="ml-0.625 flex justify-center items-center">
    <div @click="toggleLang" class="flex items-center gap-2 cursor-pointer">
      <p class="text-white">{{ language.display }}</p>
      <IconVector></IconVector>
    </div>

    <div
      v-show="language.show"
      :class="langMargin"
      class="absolute border-1 bg-slate-500 px-[3rem] py-0.75 rounded-lg sm:right-[0.75rem] md:right-auto"
    >
      <div class="flex flex-col gap-2">
        <button class="text-white cursor-pointer" @click="changeLanguage('en', 'Eng')">Eng</button>
        <button class="text-white cursor-pointer" @click="changeLanguage('ka', 'ქარ')">ქარ</button>
      </div>
    </div>
  </div>
</template>
