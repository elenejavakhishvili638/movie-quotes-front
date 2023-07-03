<script setup>
import { Field, useField } from 'vee-validate'
import { ref, watch, computed } from 'vue'
import IconValid from './icons/IconValid.vue'
import IconError from './icons/IconError.vue'

const props = defineProps([
  'name',
  'modelValue',
  'lang',
  'validate',
  'rows',
  'class',
  'placeholder'
])
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)
const { meta, errorMessage: error } = useField(() => props.name, props.validate)

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const inputClass = computed(() => {
  if (meta.touched && meta.valid) {
    return 'border border-[#198754]'
  } else if (meta.touched && !meta.valid) {
    return 'border border-red'
  } else {
    return 'border border-[#6C757D] '
  }
})

const img = computed(() => {
  if (meta.touched && meta.valid) {
    return IconValid
  } else if (meta.touched && !meta.valid) {
    return IconError
  } else {
    return null
  }
})
</script>

<template>
  <div :class="inputClass" class="h-5.375 flex flex-col relative rounded mb-0.75 text-xl">
    <Field :name="name" v-model="internalValue" :rules="validate" v-slot="{ field }">
      <textarea
        v-bind="field"
        :name="name"
        :rows="props.rows"
        :placeholder="placeholder"
        class="bg-transparent outline-none w-full pl-0.813 pt-0.438"
      ></textarea>
    </Field>
    <component class="absolute top-4 right-16" v-bind:is="img"></component>
    <p class="absolute right-4 top-2 text-[#6C757D] text-xl">{{ lang }}</p>
  </div>
  <p class="text-[#F15524] text-base">{{ error }}</p>
</template>
