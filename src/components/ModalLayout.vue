<script setup>
const props = defineProps(['close'])
</script>

<template>
  <div
    @click="props.close"
    class="z-10 md:z-0 h-screen overflow-y-scroll w-screen fixed flex justify-center items-center blurry-background"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.blurry-background {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
