<script setup>
import { Field, ErrorMessage, useField } from 'vee-validate'
import { ref, watch, computed } from 'vue'
import error from '../assets/images/logos/error.png'
import valid from '../assets/images/logos/valid.png'

const props = defineProps(['placeholder', 'label', 'name', 'type', 'validate', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

const { meta } = useField(props.name)

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
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

const img = computed(() => {
  if (meta.touched && meta.valid) {
    return valid
  } else if (meta.touched && !meta.valid) {
    return error
  } else {
    return ''
  }
})
</script>

<template>
  <div class="flex flex-col w-[360px] mb-[16px]">
    <label class="mb-[8px] text-base">{{ label }}</label>
    <div
      :class="inputClass"
      class="relative flex items-center justify-between h-[38px] bg-[#CED4DA] rounded-[4px] focus:shadow-custom-focus"
    >
      <Field
        class="bg-transparent w-full outline-none py-[7px] pl-[13px] rounded-[4px]"
        :placeholder="placeholder"
        :name="name"
        :type="type"
        :rules="validate"
        autocomplete="off"
        v-model="internalValue"
      />
      <img class="mr-[12px] absolute right-0" :src="img" />
    </div>
    <ErrorMessage class="text-[#F15524] text-base mt-[6px] ml-[20px]" :name="name" />
  </div>
</template>
