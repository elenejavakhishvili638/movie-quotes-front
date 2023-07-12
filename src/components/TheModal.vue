<script setup>
const props = defineProps(['text', 'icon', 'header', 'footer', 'close'])

const closeModal = () => {
  props.close()
}
</script>

<template>
  <div
    class="h-screen w-full rounded-lg md:w-33.625 md:h-25.875 bg flex flex-col justify-center items-center mb-1.313"
  >
    <slot name="icon"></slot>
    <h1 class="text-white text-3xl font-medium mt-2.5 mb-1.313">{{ props.header }}</h1>
    <p class="w-22.313 text-center text-white text-base mb-2.5">{{ props.text }}</p>
    <slot></slot>
    <p
      @click="closeModal"
      class="mt-2 mb-[2.938rem] text-[#6C757D] text-base cursor-pointer"
      v-if="props.footer"
    >
      {{ props.footer }}
    </p>
  </div>
</template>

<style scoped>
div {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
