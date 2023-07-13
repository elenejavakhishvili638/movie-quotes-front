<script setup>
import { Field, useField } from 'vee-validate'
import { ref, watch, computed } from 'vue'
import { useLanguageStore } from '@/stores/language/index'
import IconValid from '@/components/icons/IconValid.vue'
import IconError from '@/components/icons/IconError.vue'

const props = defineProps(['name', 'modelValue', 'label', 'lang', 'type', 'validate', 'errors'])
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)
const languageStore = useLanguageStore()

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

const { meta, errorMessage: error } = useField(() => props.name, props.validate)

const inputClass = computed(() => {
  if (props.errors && props.errors[props.name]) {
    return 'border border-red'
  }
  if (meta.touched && meta.valid) {
    return 'border border-[#198754]'
  } else if (meta.touched && !meta.valid) {
    return 'border border-red'
  } else {
    return 'border border-[#6C757D]'
  }
})

const img = computed(() => {
  if (props.errors && props.errors[props.name]) {
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
  <div>
    <div :class="inputClass" class="relative w-full flex border h-3 rounded items-center mb-0.625">
      <p :class="{ 'text-[#6C757D]': internalValue }" class="ml-1">{{ label }} :</p>
      <Field
        v-model="internalValue"
        :name="props.name"
        :type="props.type"
        :rules="props.validate"
        autocomplete="off"
        class="bg-transparent outline-none h-3 px-1 py-[0.563rem] w-11.875 xl:w-37.5"
      />
      <component
        :class="props.name === 'year' ? 'right-3' : 'right-11'"
        class="absolute"
        v-bind:is="img"
      ></component>
      <p class="absolute right-3 text-[#6C757D]">{{ lang }}</p>
    </div>
    <p class="text-[#F15524] text-base" v-if="props.errors">
      {{ props.errors[props.name] && props.errors[props.name][0][language] }}
    </p>
    <p class="text-[#F15524] text-base">{{ error }}</p>
  </div>
</template>
