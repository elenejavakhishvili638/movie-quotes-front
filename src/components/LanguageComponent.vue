<script setup>
import { computed, ref } from 'vue'
import IconVector from './icons/IconVector.vue';
import { useLanguageStore } from '../stores/language/index'

const props = defineProps(['type'])

const langMargin = computed(() => {
  if (props.type === 'feed') {
    return 'top-[80%]'
  } else {
    return 'top-[6%]'
  }
})

const language = useLanguageStore()
const showLang = ref(false)

const changeLanguage = (newLanguage, display) => {
  showLang.value = false
  language.setLanguage({ newLanguage, display })
}

const toggleLang = () => {
  showLang.value = !showLang.value
}
</script>

<template>
  <div class="ml-0.625 flex justify-center items-center">
    <div @click="toggleLang" class="flex items-center gap-2">
      <p class="text-white">{{ language.display }}</p>
      <IconVector></IconVector>
    </div>

    <div
      v-show="showLang"
      :class="langMargin"
      class="absolute border-1 bg-slate-500 px-[3rem] py-0.75 rounded-lg sm:right-[0.75rem] md:right-auto"
    >
      <div class="flex flex-col gap-2">
        <button class="text-white" @click="changeLanguage('en', 'Eng')">Eng</button>
        <button class="text-white" @click="changeLanguage('ka', 'ქარ')">ქარ</button>
      </div>
    </div>
  </div>
</template>
