<template>
    <div @click="close" class="h-screen w-screen fixed flex justify-center items-center blurry-background">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    close: {
      type: Function,
    },
  },
}
</script>

<style scoped>
.blurry-background {
  backdrop-filter: blur(10px);
}
</style>