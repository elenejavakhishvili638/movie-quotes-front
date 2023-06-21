<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { ref, watch, computed } from 'vue'
import { useMoviesStore } from '../stores/movies'
import { useLanguageStore } from '../stores/language/index'

const props = defineProps(['name', 'modelValue', 'label', 'lang', 'type', 'validate'])
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)
const movieStore = useMoviesStore()
const errors = computed(() => movieStore.$state.errors)
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
    <div
      class="relative w-full flex border border-[#6C757D] h-[48px] rounded-[5px] items-center mb-[10px]"
    >
      <p :class="{ 'text-[#6C757D]': internalValue }" class="ml-[16px]">{{ label }} :</p>
      <Field
        v-model="internalValue"
        :name="props.name"
        :type="props.type"
        :rules="props.validate"
        autocomplete="off"
        class="bg-transparent outline-none h-[48px] px-[16px] py-[9px] w-[190px] lg:w-[600px]"
      />
      <p class="absolute right-5 text-[#6C757D]">{{ lang }}</p>
    </div>
    <p class="text-[#F15524] text-base ml-[20px]" v-if="errors">
      {{ errors[props.name] && errors[props.name][0][language] }}
    </p>
    <ErrorMessage class="text-[#F15524] text-base ml-[20px]" :name="name" />
  </div>
</template>
