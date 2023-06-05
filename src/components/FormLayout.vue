<script setup>
const props = defineProps(['close'])
</script>

<template>
  <div
    @click="props.close"
    class="h-screen w-screen fixed flex justify-center items-center blurry-background"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.blurry-background {
  backdrop-filter: blur(10px);
}
</style>
