<script setup>
import { Field } from 'vee-validate'
import { ref, watch } from 'vue'

const props = defineProps(['name', 'modelValue', 'label', 'lang', 'type'])
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div>
    <div class="relative w-full flex border border-[#6C757D] h-[48px] rounded-[5px] items-center">
      <p :class="{'text-[#6C757D]': internalValue}" class="ml-[16px]">{{ label }} :</p>
      <Field
        v-model="internalValue"
        :name="props.name"
        :type="props.type"
        class="bg-transparent outline-none h-[48px] px-[16px] py-[9px] w-[600px]"
      />
      <p class="absolute right-5 text-[#6C757D]">{{ lang }}</p>
    </div>
  </div>
</template>
