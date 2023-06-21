<template>
  <div
    class="z-10 md:z-0 h-screen overflow-y-scroll w-screen fixed flex justify-center items-center blurry-background"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.blurry-background {
  background: rgba(0, 0, 0, 0.5);
}
</style>
