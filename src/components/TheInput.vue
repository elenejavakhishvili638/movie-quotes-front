<script setup>
import { Field, ErrorMessage, useField } from 'vee-validate'
import { ref, watch, computed } from 'vue'
import IconValid from '@/components/icons/IconValid.vue'
import IconError from '@/components/icons/IconError.vue'
import CloseInput from '@/components/icons/CloseInput.vue'
import { useLanguageStore } from '@/stores/language/index'
import ClosedEye from '@/components/icons/ClosedEye.vue'

const props = defineProps([
  'placeholder',
  'label',
  'name',
  'type',
  'validate',
  'modelValue',
  'errors'
])
const emit = defineEmits(['update:modelValue'])
const internalValue = ref(props.modelValue)
const languageStore = useLanguageStore()
const isWriting = ref(false)
const inputType = ref(props.type)

const { meta } = useField(() => props.name)

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(internalValue, (newValue) => {
  isWriting.value = newValue !== ''
})

const inputClass = computed(() => {
  if (props.errors[props.name]) {
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
  if (props.errors[props.name]) {
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
const toggleInputType = () => {
  if (inputType.value === 'password') {
    inputType.value = 'text'
  } else {
    inputType.value = 'password'
  }
}
</script>

<template>
  <div class="flex flex-col mb-1">
    <label class="mb-0.5 text-base"
      >{{ label }}<span class="text-red text-base" v-if="!meta.valid"> *</span></label
    >
    <div
      :class="inputClass"
      class="relative z-0 flex items-center justify-between h-2.375 bg-cyanBlue rounded"
    >
      <Field
        class="bg-transparent w-full outline-none py-0.438 pl-0.813 rounded focus:shadow-custom-focus text-black"
        :placeholder="props.placeholder"
        :name="props.name"
        :type="inputType"
        :rules="props.validate"
        autocomplete="off"
        v-model="internalValue"
      />
      <ClosedEye
        v-if="props.name === 'password' || props.name === 'password_confirmation'"
        :class="img === null ? 'right-[0.5rem]' : 'right-[1.8rem]'"
        class="absolute cursor-pointer"
        @click="toggleInputType"
      ></ClosedEye>
      <CloseInput
        v-if="isWriting && props.name !== 'password' && props.name !== 'password_confirmation'"
        :class="img === null ? 'right-[0.5rem]' : 'right-[1.8rem]'"
        class="absolute cursor-pointer"
        @click="internalValue = ''"
      ></CloseInput>
      <component class="absolute mr-[0.5rem] right-0" v-bind:is="img"></component>
    </div>
    <p class="text-[#F15524] text-base mt-[0.375rem] w-22.5" v-if="errors">
      {{ errors[props.name] && errors[props.name][0][language] }}
    </p>
    <ErrorMessage class="text-[#F15524] text-base mt-[0.375rem] w-22.5" :name="name" />
  </div>
</template>
