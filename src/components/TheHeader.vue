<script setup>
import LanguageComponent from './LanguageComponent.vue'

const props = defineProps(['register', 'login'])
</script>

<template>
  <div class="flex justify-between lg:px-[70px] px-[16px] pt-[24px] items-center">
    <h2 class="text-cream">MOVIE QUOTES</h2>
    <div class="flex items-center">
      <language-component class="mr-[20px]"></language-component>
      <div class="flex">
        <button
          @click="props.register"
          class="mr-[8px] justify-center items-center flex px-[10px] h-32 rounded-[4px] text-white text-sm border-none bg-red"
        >
          {{ $t('texts.sign_up') }}
        </button>
        <button
          @click="props.login"
          class="justify-center items-center flex w-72 h-32 border border-white rounded-[4px] text-white text-sm"
        >
          {{ $t('texts.log_in') }}
        </button>
      </div>
    </div>
  </div>
</template>
