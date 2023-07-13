<script setup>
import LanguageComponent from '@/components/LanguageComponent.vue'

const props = defineProps(['register', 'login'])
</script>

<template>
  <div class="flex justify-between lg:px-4.375 px-1 pt-1.5 items-center">
    <h1 class="text-cream text-sm md:text-xl uppercase">{{ $t('landing.title') }}</h1>
    <div class="flex items-center">
      <language-component class="mr-1.25"></language-component>
      <div class="flex">
        <button
          @click="props.register"
          class="mr-0.5 justify-center items-center flex px-0.625 h-2 md:w-6 rounded text-white text-sm border-none bg-red"
        >
          {{ $t('texts.sign_up') }}
        </button>
        <button
          @click="props.login"
          class="justify-center items-center flex h-2 border w-4.5 md:w-6 border-white rounded text-white xl:text-base text-sm"
        >
          {{ $t('texts.log_in') }}
        </button>
      </div>
    </div>
  </div>
</template>
