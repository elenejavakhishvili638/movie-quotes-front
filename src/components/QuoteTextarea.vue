<script setup>
import { Field } from 'vee-validate'
import { ref, watch } from 'vue'

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

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="border border-[#6C757D] h-[86px] flex flex-col relative rounded-[4px] mb-[10px]">
    <Field :name="name" v-model="internalValue" :rules="validate" v-slot="{ field }">
      <textarea
        v-bind="field"
        :name="name"
        :rows="props.rows"
        :placeholder="placeholder"
        class="bg-transparent outline-none w-full pl-[13px] pt-[7px]"
      ></textarea>
    </Field>
    <p class="absolute right-4 top-2 text-[#6C757D]">{{ lang }}</p>
  </div>
</template>
