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
  <div class="border border-[#CED4DA33] mb-2 w-33 h-9 rounded p-1.5">
    <p class="text-base mb-1">{{ props.label }}</p>
    <div class="flex items-center gap-2">
      <div
        :class="{
          'bg-greenCyan': props.conditionOne,
          'bg-lightBrown': !props.conditionOne
        }"
        class="w-1 h-1 rounded-full"
      ></div>
      <p
        :class="{
          'text-white': props.conditionOne,
          'text-lightBrown': !props.conditionOne
        }"
        class="text-sm mb-0.5"
      >
        {{ props.conditionTextOne }}
      </p>
    </div>
    <div class="flex items-center gap-2">
      <div
        :class="{
          'bg-greenCyan': props.conditionOne && props.conditionTwo,
          'bg-lightBrown': !props.conditionOne || !props.conditionTwo
        }"
        class="w-1 h-1 rounded-full"
      ></div>
      <p
        :class="{
          'text-white': props.conditionOne && props.conditionTwo,
          'text-lightBrown': !props.conditionOne || !props.conditionTwo
        }"
        class="text-sm"
      >
        {{ props.conditionTextTwo }}
      </p>
    </div>
  </div>
</template>
