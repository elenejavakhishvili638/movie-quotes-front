<script setup>
const props = defineProps({
  disabled: Boolean
})
</script>

<template>
  <button
    :class="{ 'bg-red': !props.disabled, 'bg-[#EC4C57]': props.disabled }"
    :disabled="props.disabled"
    class="w-22.5 rounded-lg text-white h-2.375 mb-[1rem] mt-0.5"
  >
    <slot></slot>
  </button>
</template>
