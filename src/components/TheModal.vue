<script setup>
const props = defineProps(['text', 'icon', 'header', 'footer', 'close'])

const closeModal = () => {
  props.close()
}
</script>

<template>
  <div
    class="h-screen w-full md:rounded-[10px] md:w-[538px] md:h-[414px] bg flex flex-col justify-center items-center rounded-[10px]"
  >
    <img :src="props.icon" class="mb-[21px] mt-[40px]" />
    <h1 class="text-white text-[32px] font-medium mb-[21px]">{{ props.header }}</h1>
    <p class="w-[357px] text-center text-white text-[16px] mb-[40px]">{{ props.text }}</p>
    <slot></slot>
    <p
      @click="closeModal"
      class="mt-[32px] mb-[47px] text-[#6C757D] text-base cursor-pointer"
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
