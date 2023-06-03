<template>
  <div
    class="h-screen w-full md:rounded-[10px] md:w-[538px] md:h-[414px] bg flex flex-col justify-center items-center rounded-[10px]"
  >
    <img :src="logo" class="mb-[21px] mt-[40px]" />
    <h1 class="text-white text-[32px] font-medium mb-[21px]">{{ modalHeader }}</h1>
    <p class="w-[357px] text-center text-white text-[16px] mb-[40px]">{{ modalText }}</p>
    <slot></slot>
    <p
      @click="closeModal"
      class="mt-[32px] mb-[47px] text-[#6C757D] text-base cursor-pointer"
      v-if="modalFooter"
    >
      {{ modalFooter }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text', 'icon', 'header', 'footer', 'close'],
  setup(props) {
    const closeModal = () => {
      props.close()
    }

    return {
      logo: props.icon,
      modalText: props.text,
      modalHeader: props.header,
      modalFooter: props.footer,
      closeModal
    }
  }
}
</script>

<style scoped>
div {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
