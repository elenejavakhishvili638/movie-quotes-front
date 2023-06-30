<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { ref, watch, computed } from 'vue'
import { useLanguageStore } from '../stores/language/index'

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

const language = computed(() => languageStore.currentLanguage)
</script>

<template>
  <div>
    <div class="relative w-full flex border border-[#6C757D] h-3 rounded items-center mb-0.625">
      <p :class="{ 'text-[#6C757D]': internalValue }" class="ml-1">{{ label }} :</p>
      <Field
        v-model="internalValue"
        :name="props.name"
        :type="props.type"
        :rules="props.validate"
        autocomplete="off"
        class="bg-transparent outline-none h-3 px-1 py-[0.563rem] w-11.875 lg:w-37.5"
      />
      <p class="absolute right-5 text-[#6C757D]">{{ lang }}</p>
    </div>
    <p class="text-[#F15524] text-base ml-1.25" v-if="props.errors">
      {{ props.errors[props.name] && props.errors[props.name][0][language] }}
    </p>
    <ErrorMessage class="text-[#F15524] text-base ml-1.25" :name="name" />
  </div>
</template>
