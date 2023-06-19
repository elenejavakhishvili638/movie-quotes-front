<script setup>
import { Field, ErrorMessage, useField } from 'vee-validate'
import { watch, ref, computed } from 'vue'
import error from '../assets/images/logos/error.png'
import valid from '../assets/images/logos/valid.png'

const props = defineProps(['text', 'name', 'modelValue', 'type', 'validation', 'close'])
const emit = defineEmits(['update:modelValue', 'submitForm'])
const internalValue = ref(props.modelValue)
const modal = ref(false)

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal
  }
)

watch(internalValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emit('update:modelValue', newValue)
  }
})

const { meta } = useField(() => props.name)

const img = computed(() => {
  if (meta.touched && meta.valid) {
    return valid
  } else if (meta.touched && !meta.valid) {
    return error
  } else {
    return ''
  }
})

const inputClass = computed(() => {
  if (meta.touched && meta.valid) {
    return 'border border-[#198754]'
  } else if (meta.touched && !meta.valid) {
    return 'border border-red'
  } else {
    return 'border-none'
  }
})

const openModal = () => {
  // props.close()
  modal.value = true
}

const closeModal = () => {
  modal.value = false
}

const submitForm = () => {
  emit('submitForm')
}
</script>

<template>
  <div v-if="modal" class="modal w-22.75 h-13.188 rounded-xl opacity-1">
    <p class="px-16 pt-16 pb-11 border-b border-b-[#CED4DA33]">Are you sure to make changes ?</p>
    <div class="px-5 flex justify-between mt-1.5">
      <button type="button" @click="closeModal">Cancel</button>
      <button type="button" @click="submitForm" class="bg-[#E31221] py-2 rounded w-[4.313rem]">
        confirm
      </button>
    </div>
  </div>
  <div v-if="!modal" class="w-full">
    <div class="bg-[#24222F] rounded-xl flex flex-col items-center py-8 pt-20 pb-[4.625rem]">
      <p class="mb-0.5 text-base w-22.75 self-center">{{ props.text }}</p>
      <div
        :class="inputClass"
        class="relative z-10 flex items-center justify-between h-3 w-22.75 bg-[#CED4DA] rounded focus:shadow-custom-focus"
      >
        <Field
          :rules="validation"
          v-model="internalValue"
          :name="props.name"
          :type="props.type"
          autocomplete="off"
          class="bg-[#CED4DA] outline-none rounded h-3 w-22.75"
        />
        <img class="mr-[12px] absolute right-0" :src="img" />
      </div>
      <ErrorMessage class="text-[#F15524] text-base mt-[6px] ml-[20px]" :name="props.name" />
      <!-- {{ meta }} -->
    </div>
    <div class="px-[3.25rem] flex justify-between mt-2.375 text-base">
      <button type="button" @click="props.close">Cancel</button>
      <button type="button" @click="openModal" class="bg-[#E31221] py-2 px-3 rounded w-[4.313rem]">
        Edit
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  background: linear-gradient(
    80deg,
    rgba(91, 90, 90, 0.3) -1.81%,
    rgba(239, 239, 239, 0.00514528) 102.5%,
    rgba(1, 1, 1, 0.00260417) 102.51%,
    rgba(166, 161, 161, 0.05) 102.52%
  );
}
</style>
