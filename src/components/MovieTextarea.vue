<script setup>
import { Field } from 'vee-validate'
import { ref, watch } from 'vue'

const props = defineProps(['name', 'modelValue', 'label', 'lang', 'validate', 'rows', 'class'])
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="border border-[#6C757D] h-5.375 flex flex-col relative rounded mb-0.625">
    <p :class="props.class" class="left-4 top-2 pl-1 pt-0.5">{{ label }}</p>
    <Field :name="name" v-model="internalValue" :rules="validate" v-slot="{ field }">
      <textarea
        v-bind="field"
        :name="name"
        :rows="props.rows"
        class="bg-transparent outline-none w-full pl-0.813 pt-0.438"
      ></textarea>
    </Field>
    <p class="absolute right-4 top-2 text-[#6C757D]">Eng</p>
  </div>
</template>
