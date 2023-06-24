<script setup>
import { Field, ErrorMessage, useField } from 'vee-validate'
import { ref, watch, computed } from 'vue'
import IconValid from './icons/IconValid.vue'
import IconError from './icons/IconError.vue'
import { useAuthStore } from '../stores/registration'
import { useLanguageStore } from '../stores/language/index'

const props = defineProps(['placeholder', 'label', 'name', 'type', 'validate', 'modelValue'])
const emit = defineEmits(['update:modelValue'])
const authStore = useAuthStore()
const internalValue = ref(props.modelValue)
const errors = computed(() => authStore.$state.errors)
const languageStore = useLanguageStore()

const { meta } = useField(() => props.name)

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const inputClass = computed(() => {
  if (errors.value[props.name]) {
    return 'border border-red'
  }
  if (meta.touched && meta.valid) {
    return 'border border-[#198754]'
  } else if (meta.touched && !meta.valid) {
    return 'border border-red'
  } else {
    return 'border-none'
  }
})

const img = computed(() => {
  if (errors.value[props.name]) {
    return IconError
  }

  if (meta.touched && meta.valid) {
    return IconValid
  } else if (meta.touched && !meta.valid) {
    return IconError
  } else {
    return null
  }
})

const language = computed(() => languageStore.currentLanguage)
</script>

<template>
  <div class="flex flex-col mb-1">
    <label class="mb-0.5 text-base">{{ label }}</label>
    <div
      :class="inputClass"
      class="relative z-0 flex items-center justify-between h-2.375 bg-[#CED4DA] rounded focus:shadow-custom-focus"
    >
      <Field
        class="bg-transparent w-full outline-none py-0.438 pl-0.813 rounded"
        :placeholder="props.placeholder"
        :name="props.name"
        :type="props.type"
        :rules="props.validate"
        autocomplete="off"
        v-model="internalValue"
      />
      <component class="absolute mr-0.75 right-0" v-bind:is="img"></component>
    </div>
    <p class="text-[#F15524] text-base ml-1.25 mt-1" v-if="errors">
      {{ errors[props.name] && errors[props.name][0][language] }}
    </p>
    <ErrorMessage class="text-[#F15524] text-base mt-[0.375rem] ml-1.25" :name="name" />
  </div>
</template>
