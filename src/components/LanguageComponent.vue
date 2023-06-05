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
    <div @click="toggleLang" class="flex items-center gap-[10px]">
      <p class="text-white">{{ language.display }}</p>
      <img :src="Vector" />
    </div>

    <div
      v-show="showLang"
      class="absolute border-1 top-[7%] bg-slate-500 px-[50px] py-[10px] rounded-[8px]"
    >
      <div class="flex flex-col gap-[10px]">
        <button class="text-white" @click="changeLanguage('en', 'Eng')">Eng</button>
        <button class="text-white" @click="changeLanguage('ka', 'ქარ')">ქარ</button>
      </div>
    </div>
  </div>
</template>
