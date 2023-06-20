<script setup>
const props = defineProps([
  'conditionOne',
  'conditionTwo',
  'conditionTextOne',
  'conditionTextTwo',
  'label'
])
</script>

<template>
  <div class="border border-[#CED4DA33] mb-2 w-33 h-9 rounded p-6">
    <p class="text-base mb-1">{{ props.label }}</p>
    <div class="flex items-center gap-2">
      <div
        :class="{
          'bg-[#198754]': props.conditionOne,
          'bg-[#9C9A9A]': !props.conditionOne
        }"
        class="w-1 h-1 rounded-full"
      ></div>
      <p
        :class="{
          'text-[white]': props.conditionOne,
          'text-[#9C9A9A]': !props.conditionOne
        }"
        class="text-sm mb-0.5"
      >
        {{ props.conditionTextOne }}
      </p>
    </div>
    <div class="flex items-center gap-2">
      <div
        :class="{
          'bg-[#198754]': props.conditionOne && props.conditionTwo,
          'bg-[#9C9A9A]': !props.conditionOne || !props.conditionTwo
        }"
        class="w-1 h-1 rounded-full"
      ></div>
      <p
        :class="{
          'text-[white]': props.conditionOne && props.conditionTwo,
          'text-[#9C9A9A]': !props.conditionOne || !props.conditionTwo
        }"
        class="text-sm"
      >
        {{ props.conditionTextTwo }}
      </p>
    </div>
  </div>
</template>
