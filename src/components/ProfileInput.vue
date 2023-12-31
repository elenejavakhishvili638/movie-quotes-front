<script setup>
import { Field, ErrorMessage, useField } from 'vee-validate'
import { watch, ref, computed } from 'vue'
import { useUpdateUserStore } from '@/stores/updateUser'
import IconValid from '@/components/icons/IconValid.vue'
import IconError from '@/components/icons/IconError.vue'
import { useLanguageStore } from '@/stores/language/index'

const props = defineProps(['text', 'name', 'modelValue', 'type', 'validation', 'close'])
const emit = defineEmits(['update:modelValue', 'submitForm'])
const internalValue = ref(props.modelValue)
const modal = ref(false)
const updateUserStore = useUpdateUserStore()
const languageStore = useLanguageStore()
const userStore = computed(() => updateUserStore.$state.form)

const language = computed(() => languageStore.currentLanguage)

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

const { meta, validate: validateProfileInput } = useField(() => props.name, props.validation)

const img = computed(() => {
  if (meta.touched && meta.valid) {
    return IconValid
  } else if (meta.touched && !meta.valid) {
    return IconError
  } else {
    return ''
  }
})

const inputClass = computed(() => {
  if (meta.touched && meta.valid) {
    return 'border border-[#198754]'
  } else if (meta.touched && !meta.valid) {
    return 'border border-red'
  } else {
    return 'border-none'
  }
})

const openModal = async () => {
  await validateProfileInput()
  if (props.name === 'updatedPassword') {
    if (meta.valid && userStore.value.password_confirmation === userStore.value.password) {
      modal.value = true
    }
  } else {
    if (meta.valid) {
      modal.value = true
    }
  }
}

const closeModal = () => {
  modal.value = false
}

const submitForm = () => {
  props.close()
  emit('submitForm')
}
</script>

<template>
  <div class="modal w-22.75 h-13.188 rounded-xl opacity-1" v-if="modal">
    <p class="px-[3rem] pt-4 pb-2.75 border-b border-b-[#CED4DA33]">
      {{ $t('profile.make_changes') }}
    </p>
    <div class="px-1.25 flex justify-between mt-1.5">
      <button type="button" @click="closeModal">{{ $t('profile.cancel') }}</button>
      <button type="button" @click="submitForm" class="bg-[#E31221] py-0.5 rounded w-[4.313rem]">
        {{ $t('profile.confirm') }}
      </button>
    </div>
  </div>
  <div v-if="!modal" class="w-full">
    <div class="bg-[#24222F] rounded-xl flex flex-col items-center py-2 pt-5 pb-4.625">
      <p class="mb-0.5 text-base w-22.75 self-center">{{ props.text }}</p>
      <div
        :class="inputClass"
        class="pl-[1rem] flex items-center justify-between h-3 w-22.75 bg-[#CED4DA] rounded focus:shadow-custom-focus"
      >
        <Field
          :rules="validation"
          v-model="internalValue"
          :name="props.name"
          :type="props.type"
          autocomplete="off"
          class="bg-transparent outline-none rounded h-3 w-22.75"
        />
        <component class="mr-0.75 right-0" v-if="img" :is="img"></component>
      </div>
      <ErrorMessage class="text-[#F15524] text-base mt-0.5 w-22.75" :name="props.name" />
    </div>
    <div
      v-if="props.name === 'updatedPassword'"
      class="bg-[#24222F] rounded-xl flex flex-col items-center py-2 pb-4.625"
    >
      <p class="mb-0.5 text-base w-22.75 self-center">{{ $t('profile.confirm_password') }}</p>
      <div
        :class="inputClass"
        class="pl-0.5 relative z-10 flex items-center justify-between h-3 w-22.75 bg-[#CED4DA] rounded focus:shadow-custom-focus"
      >
        <Field
          rules="required|confirmed:@password"
          v-model="userStore.password_confirmation"
          name="password_confirmation"
          type="password"
          autocomplete="off"
          class="bg-transparent outline-none rounded h-3 w-22.75"
        />
        <img class="mr-0.75 absolute right-0" v-if="img" :src="img" />
      </div>
      <ErrorMessage class="text-[#F15524] text-base mt-0.5 w-22.75" name="password_confirmation" />
    </div>
    <div class="px-3.25 flex justify-between mt-2.375 text-base">
      <button type="button" @click="props.close">{{ $t('profile.cancel') }}</button>
      <button
        :class="{ 'w-[8.5rem]': language === 'ka', 'w-[4.313rem]': language === 'en' }"
        type="button"
        @click="openModal"
        class="bg-[#E31221] py-0.5 px-0.75 rounded"
      >
        {{ $t('profile.edit') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  background: linear-gradient(
    80deg,
    rgba(91, 90, 90, 0.3) -1.81%,
    rgba(239, 239, 239, 0.00514528) 102.5%,
    rgba(1, 1, 1, 0.00260417) 102.51%,
    rgba(166, 161, 161, 0.05) 102.52%
  );
}
</style>
