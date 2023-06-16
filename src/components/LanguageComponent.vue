<script setup>
import Vector from '../assets/images/logos/Vector.png'
import { ref } from 'vue'

import { useLanguageStore } from '../stores/language/index'

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
  <div class="ml-[10px] flex justify-center items-center">
    <div @click="toggleLang" class="flex items-center gap-2">
      <p class="text-white">{{ language.display }}</p>
      <img :src="Vector" />
    </div>

    <div v-show="showLang" class="absolute border-1 top-[80%] bg-slate-500 px-12 py-3 rounded-lg">
      <div class="flex flex-col gap-[10px]">
        <button class="text-white" @click="changeLanguage('en', 'Eng')">Eng</button>
        <button class="text-white" @click="changeLanguage('ka', 'ქარ')">ქარ</button>
      </div>
    </div>
  </div>
</template>
